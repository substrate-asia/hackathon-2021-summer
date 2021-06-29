#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

/*
 活动合约
 1. 由活动模板合约创建，每个模板匹配一个活动合约
 2. 每个活动会独立部署一个合约(实例);
 3. 所有合约的操作都是通过活动合约实现；
*/
#[ink::contract]
mod meeting {
	use ink_storage::{
		collections::HashMap as StorageMap,
		traits::{PackedLayout, SpreadLayout},
	};

	// 定价方式，Uniform 统一定价，Partition 分区定价
	#[derive(
		Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
	)]
	#[cfg_attr(
		feature = "std",
		derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
	)]
	enum PriceType {
		Uniform,
		Partition,
	}
	impl Default for PriceType {
		fn default() -> PriceType {
			PriceType::Uniform
		}
	}

	// 场地区域设置，name 区域名称，rows:有多少排，cols: 每排多少座
	#[derive(
		Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
	)]
	#[cfg_attr(
		feature = "std",
		derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
	)]
	struct Zone {
		// 场地区域设置
		name: Vec<u8>, // 区域名称
		rows: u8,      // 行
		cols: u8,      // 列
	}
	impl Default for Zone {
		fn default() -> Zone {
			Zone {
				name: Default::default(),
				rows: Default::default(),
				cols: Default::default(),
			}
		}
	}

	// 座位状态，Disabled 座位不可用；Empty 座位空闲；Ticket(u128, u128) 座位售出，里边两个数是售出NFT门票的 class_id 和 nft_id
	#[derive(
		Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
	)]
	#[cfg_attr(
		feature = "std",
		derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
	)]
	enum SeatStatus {
		Disabled,
		Empty,
		Ticket(u128, u128),
	}
	impl Default for SeatStatus {
		fn default() -> SeatStatus {
			SeatStatus::Empty
		}
	}

	// 检票历史记录
	#[derive(
		Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
	)]
	#[cfg_attr(
		feature = "std",
		derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
	)]
	struct check_record {
		inspectors: AccountId, // 检票人
		timestamp: u128,       // 检票时间戳
		block: u128,           // 检票记录区块
	}
	impl Default for check_record {
		fn default() -> check_record {
			check_record {
				inspectors: Default::default(),
				timestamp: Default::default(),
				block: Default::default(),
			}
		}
	}

	#[ink(storage)]
	pub struct Meeting {
		// 这个是关于活动控制部分，不属于活动跟本身的信息
		controller: AccountId, // 主合约地址
		template: AccountId,   // 主合约地址
		owner: AccountId,      // 活动管理员
		max_zone_id: u8,       // 最大的zone_id

		// 活动基础信息
		//      这部分信息的修改，通过主合约来修改
		// name: Vec<u8>, // 活动名称
		// desc: Vec<u8>, // 活动描述
		// uri: Vec<u8>,  // 活动网址
		// poster: Vec<u8>, // 活动海报地址
		// start_time: u64,       // 活动开始时间
		// end_time: u64,         // 活动结束时间
		// start_sale_time: u64,       // 开始售卖时间
		// end_sale_time: u64,         // 开始售卖时间
		// status: MeetingStatus,  // 会议状态

		// 活动配置参数
		local_address: Vec<u8>,                      // 获取举办地址
		zones: StorageMap<u8, Zone>,                 // 活动场地的分区配置，key 为分区的序号
		price_type: PriceType,                       // 收费方式
		price: Balance,                              // 收费方式=Uniform 时候生效
		prices: StorageMap<u8, Balance>, //收费明细，收费方式=Partition时候看，生效；带个是 zone_id
		seats: StorageMap<(u8, u8, u8), SeatStatus>, // 活动场地的不可用的座位，是由元组组成的key，元组元素为 分区序号，排号，座号。这样可以快速检测座位是否被禁用
		inspectors: StorageMap<AccountId, bool>,     // 检票员

		// 用户参与后会产生的数据
		tickets: StorageMap<(u128, u128), (u8, u8, u8)>, // 已经售出门票，由元组组成key,元组元素为 分区序号，排号，座号，值是门票NFT（包括集合ID和NFT ID）

		check_records: StorageMap<(u128, u128), Vec<check_record>>, // 检票记录：
	}

	impl Meeting {
		#[ink(constructor)]
		pub fn new(controller: AccountId, template: AccountId) -> Self {
			let caller = Self::env().caller();
			Self {
				controller: controller,
				template: template,
				owner: caller,
				local_address: Default::default(),
				zones: Default::default(),
				price_type: Default::default(),
				prices: Default::default(),
				price: Default::default(),
				seats: Default::default(),
				tickets: Default::default(),
				inspectors: Default::default(),
				check_records: Default::default(),
				max_zone_id: Default::default(),
			}
		}

		/**
		转移 owner
		1. 必须 owner 才可以调用
		*/
		#[ink(message)]
		pub fn transfer_owner(&mut self, new_owner: AccountId) {
			self.owner = new_owner;
		}

		pub fn get_owner(&self) -> AccountId {
			self.owner
		}

		/**
		更新活动信息，包括：活动基础信息、活动配置参数
		1. 只有 owner 可以调用修改，如果活动处于 active 状态 或者 活动已经有售卖门票，暂时不允许修改；
		2. 如果涉及到基础信息部分的更新，需要调用主合约更新；
		3. 修改成功后，触发事件 meeting_modified
		*/
		pub fn modify_meeting(&mut self, local_address: Vec<u8>, price_type: PriceType) {
			// todo
		}

		/**
		添加区域
		1. 需要 owner 设置
		2. 如果 PriceType 是 Partition 时，price 会自动忽略（但是必须传）
		3. 返回的是 zone 的ID
		*/
		pub fn add_zone(&mut self, name: Vec<u8>, rows: u8, cols: u8, price: Balance) -> u8 {
			let new_zone = Zone { name, rows, cols };
			let zone_id = self.max_zone_id;
			self.max_zone_id += 1;
			self.zones.insert(zone_id, new_zone);

			if let PriceType::Partition = self.price_type {
				self.prices.insert(zone_id, price);
			}

			zone_id
		}

		/**
		修改区域
		1. 需要 owner 设置
		2. zone_id 必须存在
		3. 如果 PriceType 是 Partition 时，price 会自动忽略（但是必须传）
		4. 返回的是 zone_id，zong_id 会自增
		*/
		pub fn update_zone(
			&mut self,
			zone_id: u8,
			name: Vec<u8>,
			rows: u8,
			cols: u8,
			price: Balance,
		) -> u8 {
			let zone = self.zones.get(&zone_id).expect("zone does not exists ");
			let mut new_zone = zone.clone();
			new_zone.name = name;
			new_zone.rows = rows;
			new_zone.cols = cols;
			self.zones.insert(zone_id, new_zone);

			if let PriceType::Partition = self.price_type {
				self.prices.insert(zone_id, price);
			}

			zone_id
		}
		/**
		删除区域
		1. 需要 owner 设置
		2. zone_id 必须存在
		3. 删除操作不会修改 zone_id 序号
		*/
		pub fn remove_zone(&mut self, zone_id: &u8) -> bool {
			let mut zone = self.zones.get(zone_id).expect("zone does not exists ");
			// self.zones.remove(zone_id); // todo
			// self.prices.remove(zone_id); // todo
			true
		}

		/**
		 设置座位不可用的座位
		 1. 所有提交的座位都标记为不可用
		 2. 所有未包含的座位都需要设置为可用
		 3. 如果已经售出的，不允许修改
		*/
		pub fn set_disabled_seats(&mut self, seats: Vec<(u8, u8, u8)>) -> bool {
			for seat in &seats {
				// todo 如果已经售出的，不允许修改 ?
				// self.seats.insert(*seat.clone(), SeatStatus::Disabled);
			}
			true
		}

		/**
		购买门票
		1. 需要检查作为是否可用（1）是否被禁用；（2）是否已经卖出去了；
		2. 需要确认转过来的钱是否大于等于票价（如果大于需要退回一部分）
		3. 调用主合约创建 NFT 门票，需要支付服务费：服务费按票价比例(ratio)，但是不得低于 min_ticket_price
		4. 更新 seats、tickets
		5. 返回
		*/
		pub fn buy_ticket(zone_id: u8, row: u8, col: u8) -> (u128, u128) {
			// todo 与 online meeting 一致
			(0,0)
		}

		/**
		添加验票员
		1. 只能由 owner 调用
		2. 需要检查是否已经存在了
		3. 触发时间 inspector_added
		*/
		pub fn add_inspector(&mut self, inspector: AccountId) {
			// todo 与 online meeting 一致
		}

		/**
		移除验票员
		1. 只能由 owner 调用
		2. 需要检查是否存在
		3. 触发事件 inspector_removed
		*/
		pub fn remove_inspector(&mut self, inspector: AccountId) {
			// todo 与 online meeting 一致
		}

		/**
		检票
		1. 只能由 owner 或者 inspector 调用
		2. 检查 NFT门票 是否有效；
		3. 检查时间戳和当前区块时间戳间隔是否在 N 分钟以内
		4. 获取 NFT门票当前的拥有账号
		5. 检测 NFT门票的class_ID、nft_id, 和 timestamp 的 hash值与 提供的hash是否匹配
		6. 添加检票记录 check_records ，返回 true
		7. 触发事件 ticket_checked
		*/
		pub fn check_ticket(&mut self, ticket: (u128, u128), timestamp: u128, hash: Vec<u8>) -> bool {
			// todo 与 online meeting 一致
			true
		}

		/**
		返回所有的门票检票记录
		*/
		pub fn get_check_records(&self, ticket: (u128, u128)) {
			// todo 与 online meeting 一致
		}

		/**
		提取门票收入
		1. 只能由 owner 调用
		2.
		*/
		pub fn withdraw(&mut self, to: AccountId, amount: Balance) {
			// todo 与 online meeting 一致
		}
	}
}

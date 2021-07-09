#![cfg_attr(not(feature = "std"), no_std)]
use ink_lang as ink;
pub use offline_meeting::*;
pub use nftmart_contract::*;
/*
 活动合约
 1. 由活动模板合约创建，每个模板匹配一个活动合约
 2. 每个活动会独立部署一个合约(实例);
 3. 所有合约的操作都是通过活动合约实现；
*/
#[ink::contract(env = CustomEnvironment)]
pub mod offline_meeting {
	use super::*;
	use ink_env::call::FromAccountId;
	use ink_lang::ToAccountId;
	use ink_prelude::format;
	use ink_prelude::vec::Vec;
	use ink_storage::{
		collections::HashMap as StorageMap,
		traits::{PackedLayout, SpreadLayout},
		Lazy,
	};
	use primitives::{MeetingStatus, Ticket,MeetingError,TicketNft};
	use scale::Encode;
	use stub::MainStub;
	use ink_prelude::collections::BTreeMap;
	use ink_prelude::string::ToString;

	const BASE_PERCENT: u128 = 10000;
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

	/// 移除验票员 事件
	#[ink(event)]
	pub struct InspectorRemoved {
		#[ink(topic)]
		inspector: AccountId,
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
		Sealed,
	}
	impl Default for SeatStatus {
		fn default() -> SeatStatus {
			SeatStatus::Empty
		}
	}

	/// 检票历史记录
	#[derive(
		Debug, PartialEq, Eq, Clone, scale::Encode, scale::Decode, SpreadLayout, PackedLayout,
	)]
	#[cfg_attr(
		feature = "std",
		derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
	)]
	struct CheckRecord {
		inspectors: AccountId, // 检票人
		timestamp: u128,       // 检票时间戳
		block: u128,           // 检票记录区块
	}
	impl Default for CheckRecord {
		fn default() -> CheckRecord {
			CheckRecord {
				inspectors: Default::default(),
				timestamp: Default::default(),
				block: Default::default(),
			}
		}
	}

	#[ink(storage)]
	pub struct Meeting {
		// 这个是关于活动控制部分，不属于活动跟本身的信息
		// controller: AccountId, // 主合约地址
		template: AccountId,       // 模板合约地址
		owner: AccountId,          // 活动管理员
		max_zone_id: u8,           // 最大的zone_id
		ticket_id: u32,            //门票id
		nfticket_main_fee: u32,    //支付主合约的手续费率,需要除以1万
		main_stub: Lazy<MainStub>, //主合约地址,controller取消.
		meeting_id: u32,
		// 活动基础信息
		//      这部分信息的修改，通过主合约来修改
		name: Vec<u8>,         // 活动名称
		desc: Vec<u8>,         // 活动描述
		uri: Vec<u8>,          // 活动网址
		poster: Vec<u8>,       // 活动海报地址
		start_time: u64,       // 活动开始时间
		end_time: u64,         // 活动结束时间
		start_sale_time: u64,  // 开始售卖时间
		end_sale_time: u64,    // 开始售卖时间
		status: MeetingStatus, // 会议状态

		// 活动配置参数
		local_address: Vec<u8>,                      // 获取举办地址
		zones: StorageMap<u8, Zone>,                 // 活动场地的分区配置，key 为分区的序号
		price_type: PriceType,                       // 收费方式
		price: Balance,                              // 收费方式=Uniform 时候生效
		prices: StorageMap<u8, Balance>, //收费明细，收费方式=Partition时候看，生效；带个是 zone_id
		seats_status_map: StorageMap<(u32, u32, u32), SeatStatus>, // 活动场地的不可用的座位，是由元组组成的key，元组元素为 分区序号，排号，座号。这样可以快速检测座位是否被禁用
		inspectors: StorageMap<AccountId, bool>,     // 检票员

		// 用户参与后会产生的数据
		tickets: StorageMap<(u128, u128), (u8, u8, u8)>, // 已经售出门票，由元组组成key,元组元素为 分区序号，排号，座号，值是门票NFT（包括集合ID和NFT ID）

		check_records: StorageMap<(u128, u128), Vec<CheckRecord>>, // 检票记录：
		user_NFT_ticket_map:StorageMap<AccountId,BTreeMap<(u32,u64),TicketNft>>,	//	用户购买的票产生的NFT存储.StorageMap<用户id,BTreeMap<(classid,ticketid),TicketNft>>
	}

	impl Meeting {
		#[ink(constructor)]
		pub fn new(
			meeting_id: u32,
			name: Vec<u8>,
			desc: Vec<u8>,
			poster: Vec<u8>,
			uri: Vec<u8>,
			start_time: u64,
			end_time: u64,
			start_sale_time: u64,
			end_sale_time: u64,
			controller: AccountId,
			template: AccountId,
			main_stub_able: MainStub,
		) -> Self {
			let caller = Self::env().caller();
			let meeting = Self {
				// controller: controller,
				template: template,
				owner: caller,
				local_address: Default::default(),
				zones: Default::default(),
				price_type: Default::default(),
				prices: Default::default(),
				price: Default::default(),
				seats_status_map: Default::default(),
				tickets: Default::default(),
				inspectors: Default::default(),
				check_records: Default::default(),
				max_zone_id: Default::default(),
				ticket_id: Default::default(),
				nfticket_main_fee: 100u32,

				main_stub: Lazy::new(main_stub_able),
				meeting_id,
				name,
				desc,
				uri,
				poster,
				start_time,
				end_time,
				start_sale_time,
				end_sale_time,
				status: MeetingStatus::Active,
				user_NFT_ticket_map:Default::default(),
			};
			meeting
		}

		#[ink(message)]
		pub fn get_self(&self) -> AccountId {
			Self::env().account_id()
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

		/// 购买ticker,需要支付一定数量的币.
		/// meeting_addr会议地址,zone_id区域ID,seat_id 第几排,第几列
		#[ink(message, payable)]
		pub fn buy_ticket(&mut self, zone_id: u32, seat_id: (u32, u32)) -> bool {
			ink_env::debug_message("=========================entrance!!!");
			let caller = Self::env().caller();
			let meeting_addr = Self::env().account_id();
			let ticket_price: Balance = self.get_ticket_price(zone_id, seat_id).unwrap();
			ink_env::debug_message(&format!(
				"-------------------------ticket_price {:?}",
				ticket_price
			));
			// 买票收入,通过前端传入进来
			let income: Balance = self.env().transferred_balance();
			ink_env::debug_message(&format!("-------------------------income {:?}", income));
			// 保证用户传送的金额必须大于票价
			assert!(income >= ticket_price, "not enough money!");
			// 生成ticke_id +1
			let ticket_id = self
				.ticket_id
				.checked_add(1)
				.expect("checked plus 1 error!");
			let ticket = Ticket::new(
				self.template,
				meeting_addr,
				ticket_price,
				zone_id,
				seat_id,
				ticket_id,
				caller,
			);
			ink_env::debug_message(&format!("-------------------------ticket is {:?}", ticket));
			// 标记这个座位已经售出
			self.make_seat_sealed(zone_id, seat_id);
			// 计算主合约按照比例应该抽成多少
			let nfticket_fee = ticket_price
				.checked_mul(self.nfticket_main_fee.into())
				.unwrap()
				.checked_div(BASE_PERCENT)
				.unwrap();
			ink_env::debug_message(&format!(
				"-------------------------调用远程接口参数:主合约地址为:{:?}",
				meeting_addr
			));
			// let mut main_contract: MainStub = FromAccountId::from_account_id(self.controller);
			// main_contract.buy_ticket(ticket.clone());

			//裸调用
			// let result = build_call::<<Self as ::ink_lang::ContractEnv>::Env>()
			// .callee(t.callee)
			// .gas_limit(t.gas_limit)
			// .transferred_value(t.transferred_value)
			// .exec_input(
			//     ExecutionInput::new(t.selector.into()).push_arg(CallInput(&t.input)),
			// )
			// .returns::<()>()
			// .fire()
			// .map_err(|_| Error::TransactionFailed);

			//调用主合约
			// use ink_lang::ForwardCallMut;
			// <&mut MainStub>::call_mut(&mut self.controller)
			//     .buy_ticket(ticket.clone())
			//     .transferred_value(100) // 加上了调用 payable 的方法的时候，提供transfer
			//     .fire()
			//     .expect("something wrong");

			// 调用主合约的购票方法,并将抽成比例转给主合约.
			// let ticketNft:TicketNft = <&mut MainStub>::call_mut(&mut *self.main_stub)
			use ink_lang::ForwardCallMut;
			let ticket_nft:TicketNft = self.main_stub.call_mut()
				.buy_ticket(caller,ticket.clone())
				.transferred_value(nfticket_fee) // 加上了调用 payable 的方法的时候，提供transfer
				.fire()
				.unwrap().unwrap();
				ink_env::debug_message(&format!("-------------------------income {:?}", ticket_nft));
			// 存储用户购买的ticketNFT存储到链上,key:用户的AccountId,value:ticketNft
			if let Some(nft_tree_map)=self.user_NFT_ticket_map.get_mut(&caller){
				nft_tree_map.insert((ticket_nft._class_id,ticket_nft.token_id), ticket_nft);
			}else{
				let mut nft_tree_map = BTreeMap::<(u32,u64),TicketNft>::default();
				nft_tree_map.insert((ticket_nft._class_id,ticket_nft.token_id), ticket_nft);
				self.user_NFT_ticket_map.insert(caller, nft_tree_map);
			}
			true
		}

		#[ink(message)]
		pub fn get_user_nft_ticket(&self)->BTreeMap<(u32,u64),TicketNft>{
			let caller = Self::env().caller();
			self.user_NFT_ticket_map.get(&caller).unwrap().clone()
		}

		/// 得到某个区域的票价
		fn get_ticket_price(&self, zone_id: u32, seat_id: (u32, u32)) -> Option<Balance> {
			ink_env::debug_message("=========================get_ticket_price entrance!!!");
			//TODO 确保这个位置是有效的.
			//TODO 获取这个位置的票价
			return Some(20000000000u128.into());
		}

		/// 标记这个位置已经卖出.
		fn make_seat_sealed(&mut self, zone_id: u32, seat_id: (u32, u32)) ->bool {
			// let seat_id = seat_id.unwrap();
			let zone_seat=(zone_id,seat_id.0,seat_id.1);
			self.seats_status_map.get(&zone_seat);
			self
				.seats_status_map
				.insert(zone_seat, SeatStatus::Sealed);
			return true;
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
			self.zones.take(zone_id);
			self.prices.take(zone_id);
			true
		}

		/**
		 设置座位不可用的座位
		 1. 所有提交的座位都标记为不可用
		 2. 所有未包含的座位都需要设置为可用
		 3. 如果已经售出的，不允许修改
		*/
		pub fn set_disabled_seats(&mut self, seats: Vec<(u32, u32, u32)>) -> bool {
			for seat in &seats {
				// todo 如果已经售出的，不允许修改 ?
				let status = self.seats_status_map.get(seat).expect("seat does not exists. ");
				if status.clone() != SeatStatus::Disabled && status.clone() != SeatStatus::Empty {
					continue; // 如果已经售出的，不允许修改
				};
				self.seats_status_map.insert(seat.clone(), SeatStatus::Disabled);
			}
			true
		}

		/**
		添加验票员
		1. 只能由 owner 调用
		2. 需要检查是否已经存在了
		3. 触发时间 inspector_added
		*/
		pub fn add_inspector(&mut self, inspector: AccountId) {
			self.inspectors.insert(inspector, true);
		}

		/**
		移除验票员
		1. 只能由 owner 调用
		2. 需要检查是否存在
		3. 触发事件 inspector_removed
		*/
		pub fn remove_inspector(&mut self, inspector: AccountId) {
			self.inspectors.take(&inspector);
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
		#[ink(message)]
		pub fn check_ticket(&mut self,user:AccountId,class_id:u32,token_id:u64,time_stamp:u64,msg:Vec<u8>,hash: Vec<u8>) -> bool {
			assert!(self.is_owner_or_inspector(),"用户不是所有者,或者不是验票员!");
			let mut encode_data = class_id.to_string();

			encode_data.push_str(&token_id.to_string());
			encode_data.push_str(&time_stamp.to_string());
			
			let encode_data = encode_data.as_bytes().to_vec();
			// 签名数据 vec[u8]=account_id,class_id,ticket_id,timestap,确保二维码里面的这几个参数一定是该用户签名的,不是伪造的.
			// let encode_data = scale::Encode::encode(&(class_id,token_id,time_stamp));
			assert!(self.test_validate(user,encode_data, hash),"用户数据验证失败!");
			//检查用户是否拥有对应的ticker.确保该用户对ticker的所有权
			assert!(self.user_NFT_ticket_map.get(&user).unwrap().get(&(class_id,token_id)).is_some(),"用户ticker不存在");
			// 验证时间不会超出太久,以免别人拿着泄露的hash的二维码再次进行验票
			let now:u64 = Self::env().block_timestamp();
			assert!(time_stamp - now > 10*60*1000,"验票时间超时");
			// 6. 添加检票记录 check_records ，返回 true
			// 7. 触发事件 ticket_checked

			true
		}

		/// 验证用户传入的消息签名是否合法,需要调用extend的功能进行验证.
		#[ink(message)]
		pub fn test_validate(&self,user:AccountId,msg:Vec<u8>,hash: Vec<u8>)->bool{
			// fn validate(account_id:AccountId,signature:Vec<u8>,msg:Vec<u8>) -> bool;
			let validate:bool = self.env().extension()
                .validate(user,hash,msg);
            return validate;
		}

		#[ink(message)]
		pub fn test_just(&self)->u64{
			let now:u64 = Self::env().block_timestamp();
			now
		}

		/// 确保调用者是owner或者是设置的验票员
		fn is_owner_or_inspector(&self)->bool{
			let caller = self.env().caller();
			let is_owner = caller==self.owner;
			let is_respector = self.inspectors.contains_key(&caller);
			is_owner | is_respector
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

    // #[cfg(not(feature = "ink-experimental-engine"))]
    // #[cfg(test)]
    // mod tests {
    //     /// Imports all the definitions from the outer scope so we can use them here.
    //     use super::*;

    //     type Event = <Meeting as ::ink_lang::BaseEvent>::Type;

    //     use ink_lang as ink;

    //     /// The default constructor does its job.
    //     #[ink::test]
    //     fn new_works() {
	// 		let main_stub = FromAccountId::from_account_id(AccountId::from([0x01; 32]));
    //         // Constructor works.
    //         let meeting = Meeting::new(1,vec![79,80],vec![79,80],vec![79,80],vec![79,80],
	// 			0,
	// 			0,
	// 			0,
	// 			0,
	// 			AccountId::from([0x01; 32]),
	// 			AccountId::from([0x01; 32]),
	// 			main_stub).endowment(1)
	// 			.code_hash(Default::default())
	// 			.salt_bytes(&[])
	// 			.instantiate()
	// 			.expect("fail");
	// 		meeting.test_block_time();
    //     }
    // }

}

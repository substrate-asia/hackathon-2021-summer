#![cfg_attr(not(feature = "std"), no_std)]
pub use self::event::Event;
use ink_lang as ink;

#[ink::contract]
mod event {
	use ink_env::{
		hash::{Blake2x256, CryptoHash, HashOutput},
		Clear,
	};
	#[cfg(not(feature = "ink-as-dependency"))]
	use ink_lang as ink;
	use ink_prelude::vec::Vec;
	use ink_storage::{collections::HashMap as StorageHashMap, lazy::Lazy};

	pub type Result<T> = core::result::Result<T, Error>;

	#[ink(storage)]
	pub struct Event {
		/// 活动名称
		name: Vec<u8>,
		// 活动类型
		type_: EventType,
		// 活动状态
		status: EventStatus,
		// 活动地点
		location: Option<EventLocation>,
		//活动开始时间, timestamp
		start_time: u64,
		//活动结束时间, timestamp
		end_time: u64,
		//门票售卖开始时间, timestamp,默认活动直接开始售卖
		ticket_selling_time: u64,
		//门票售卖结束时间, timestamp,必须在活动结束时间之前
		ticket_selling_close_time: u64,
		//验票开始提前时间, sec, 在活动开始前多长时间开启验票，默认为0
		ticket_checking_advanced_time: u64,
		//验票截止提前时间, sec, 在活动结束前多长时间结束验票，默认为0
		ticket_checking_close_advanced_time: u64,
	}

	pub enum EventStatus {
		NotOpen,  // 未开启
		Open, // 开放
		Paused,// 暂停
		Closeed, // 关闭
	}

	pub enum EventType {
		Online,  // 线上活动
		Offline, // 线下活动
	}

	pub struct EventLocation {
		// 场地分区 个数
		level u16,
		// 每个分区有几排
		row u16,
	  // 每排有几座位
		seat u16,
	}

	impl Event {
		// 创建活动合约
		#[ink(constructor)]
		pub fn new(
			name: Vec<u8>,
			type_: EventType,
			location: Option<EventLocation>,
			start_time: u64,
			end_time: u64,
			ticket_selling_time: u64,
			ticket_selling_close_time: u64,
			ticket_checking_advanced_time: u64,
			ticket_checking_close_advanced_time: u64,) -> Self {
				//todo 门票售卖结束时间,必须在活动结束时间之前
			Self {
				name,
				type_,
				status:EventStatus::NotOpen,
				location,
				start_time,
				end_time,
				ticket_selling_time,
				ticket_selling_close_time,
				ticket_checking_advanced_time,
				ticket_checking_close_advanced_time,
			}
		}
		// 修改活动状态
		#[ink(message)]
		pub fn update_status(&mut self,status:EventStatus) {
			// todo 验证修改人
			// todo 如果有卖出门票，不允许关闭
			self.status = status
		}
	}

	#[cfg(test)]
	mod tests {
			use super::*;
			use ink_lang as ink;

			#[ink::test]
			fn new_works() {
					let _contract = Event::new(
						"test".as_bytes(),
						EventType::Online,
						None,
						1624157610,
						1624157620,
						1624157320,
						1624157420,
						0,
						0,
					);
			}
	}
}

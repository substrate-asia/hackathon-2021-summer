use frame_support::{assert_err, assert_ok, dispatch};
use frame_system::RawOrigin;
use sp_core::H256;
use sp_io::hashing::blake2_256;

use crate::mock::*;
use crate::*;
use sp_core::{sr25519, Pair};

use primitives::{Balance, PowerSize};

#[test]
fn kp_account_power() {
    new_test_ext().execute_with(|| {
        let balance: u64 = 1000_000_000;
        let factor = KpModule::power_factor(200000);
        let converted = KpModule::balance_apply_power(balance, factor);
        assert!(converted == 3252747248u64);

        let test_list = vec![1, 23, 34, 67, 88, 200, 300];
        assert!(KpModule::binary_search_closet(&test_list, &32) == 2);
        assert!(KpModule::binary_search_closet(&test_list, &34) == 2);
        assert!(KpModule::binary_search_closet(&test_list, &88) == 4);
        assert!(KpModule::binary_search_closet(&test_list, &70) == 4);
        assert!(KpModule::binary_search_closet(&test_list, &201) == 6);
        assert!(KpModule::binary_search_closet(&test_list, &0) == 0);
        assert!(KpModule::binary_search_closet(&test_list, &300) == 6);
    });
}

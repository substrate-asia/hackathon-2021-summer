use crate::{Error, mock::*};

use frame_support::{assert_ok, assert_noop};
use sp_runtime::DispatchError;

#[test]
fn it_works_for_sign_data() {
    new_test_ext().execute_with(|| {

        assert_ok!(SignData::bind(Origin::signed(99),1,2,vec![16, 101]));

    });
}

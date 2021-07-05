use crate::{Error, mock::*, PersonInfo};

use frame_support::{assert_ok, assert_noop};
use sp_runtime::DispatchError;

#[test]
fn it_works_for_health_ai() {
    new_test_ext().execute_with(|| {
        // 保存慢性病禁忌菜品
        assert_noop!(HealthAi::save_taboo_foods(Origin::signed(0),1, vec![10, 10]),DispatchError::BadOrigin);
        // 移除慢性病禁忌菜品
        assert_noop!(HealthAi::remove_taboo_foods(Origin::signed(0),1),DispatchError::BadOrigin);

        //绑定亲属
        let ps_info = PersonInfo {
            name: vec![111, 201, 112],
            id_card: vec![11, 112, 132],
            relation_type: 1,
            height: 170,
            weight: 120,
            chronic: vec![1, 2, 3],
        };
        assert_ok!(HealthAi::bind(Origin::signed(101),1,ps_info));
        //解绑亲属关系
        assert_ok!(HealthAi::unbind(Origin::signed(101),1));

        assert_noop!(HealthAi::unbind(Origin::signed(102),1),Error::<Test>::NoSuchRelation);
    });
}

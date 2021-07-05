use crate::*;
use frame_support::{assert_ok, impl_outer_event, impl_outer_origin, parameter_types};
use frame_system::{self as system, RawOrigin};
use sp_core::H256;
use sp_io::TestExternalities;
use sp_runtime::{
    testing::Header,
    traits::{BlakeTwo256, IdentityLookup},
    Perbill,
};

impl_outer_origin! {
    pub enum Origin for TestRuntime {}
}

// Workaround for https://github.com/rust-lang/rust/issues/26925 . Remove when sorted.
#[derive(Clone, PartialEq, Eq, Debug)]
pub struct TestRuntime;
parameter_types! {
    pub const BlockHashCount: u64 = 250;
    pub const MaximumBlockWeight: u32 = 1024;
    pub const MaximumBlockLength: u32 = 2 * 1024;
    pub const AvailableBlockRatio: Perbill = Perbill::one();
    pub const MaxFinanceMembers: u32 = 0;
    pub const MinFinanceMemberDeposit: u64 = 0;
}
impl system::Trait for TestRuntime {
    type Origin = Origin;
    type Index = u64;
    type Call = ();
    type BlockNumber = u64;
    type Hash = H256;
    type Hashing = BlakeTwo256;
    type AccountId = u64;
    type Lookup = IdentityLookup<Self::AccountId>;
    type Header = Header;
    type Event = TestEvent;
    type BlockHashCount = BlockHashCount;
    type MaximumBlockWeight = MaximumBlockWeight;
    type DbWeight = ();
    type BlockExecutionWeight = ();
    type ExtrinsicBaseWeight = ();
    type MaximumExtrinsicWeight = MaximumBlockWeight;
    type MaximumBlockLength = MaximumBlockLength;
    type AvailableBlockRatio = AvailableBlockRatio;
    type Version = ();
    type AccountData = pallet_balances::AccountData<u64>;
    type OnNewAccount = ();
    type OnKilledAccount = ();
    type BaseCallFilter = ();
    type SystemWeightInfo = ();
    type PalletInfo = ();
}

impl pallet_balances::Trait for TestRuntime {
    type Balance = u64;
    type DustRemoval = ();
    type Event = TestEvent;
    type ExistentialDeposit = ();
    type AccountStore = System;
    type WeightInfo = ();
    type MaxLocks = ();
}

mod members {
    pub use crate::Event;
}

impl_outer_event! {
    pub enum TestEvent for TestRuntime {
        members<T>,
        system<T>,
        pallet_balances<T>,
    }
}

impl Trait for TestRuntime {
    type Event = TestEvent;
    type Currency = Balances;
    type ModelCreatorCreateBenefit = ();
    type ModTreasuryModuleId = ();
    type MaxFinanceMembers = MaxFinanceMembers;
    type MinFinanceMemberDeposit = MinFinanceMemberDeposit;
}

pub type System = system::Module<TestRuntime>;
pub type Members = Module<TestRuntime>;
pub type Balances = pallet_balances::Module<TestRuntime>;

pub struct ExtBuilder;

impl ExtBuilder {
    pub fn build() -> TestExternalities {
        let storage = system::GenesisConfig::default()
            .build_storage::<TestRuntime>()
            .unwrap();
        let mut ext = TestExternalities::from(storage);
        ext.execute_with(|| System::set_block_number(1));
        ext
    }
}

#[test]
fn add_member_works() {
    ExtBuilder::build().execute_with(|| {
        assert_ok!(Members::add_council_member(RawOrigin::Root.into(), 1));

        let expected_event = TestEvent::members(RawEvent::MemberAdded(1));
        assert!(System::events().iter().any(|a| a.event == expected_event));

        assert_eq!(Members::council_members(), vec![1]);
    })
}

// Creating mock runtime here

use frame_support::{
    impl_outer_event, impl_outer_origin, ord_parameter_types, parameter_types,
    traits::{Contains, TestRandomness},
    weights::Weight,
};
use frame_system::{EnsureRoot, EnsureSignedBy};
use sp_core::H256;
use sp_runtime::{
    testing::Header,
    traits::{BlakeTwo256, IdentityLookup},
    ModuleId, Perbill,
};
use sp_std::prelude::*;

use frame_system as system;

use crate::*;

mod kp {
    pub use crate::Event;
}

impl<Hash: Clone, AccountId: Clone> PartialEq for KPDocumentData<AccountId, Hash> {
    fn eq(&self, other: &Self) -> bool {
        self.document_type == other.document_type && self.document_id == other.document_id
    }
}

impl_outer_event! {
    pub enum TestEvent for Test {
        kp<T>,
        system<T>,
        pallet_balances<T>,
        members<T>,
    }
}

impl_outer_origin! {
    pub enum Origin for Test {}
}

// For testing the pallet, we construct most of a mock runtime. This means
// first constructing a configuration type (`Test`) which `impl`s each of the
// configuration traits of pallets we want to use.
#[derive(Clone, Eq, PartialEq)]
pub struct Test;
parameter_types! {
    pub const BlockHashCount: u64 = 250;
    pub const MaximumBlockWeight: Weight = 1024;
    pub const MaximumBlockLength: u32 = 2 * 1024;
    pub const AvailableBlockRatio: Perbill = Perbill::from_percent(75);

    pub const DocumentPowerWeightAttend: u8 = 40;
    pub const DocumentPowerWeightContent: u8 = 30;
    pub const DocumentPowerWeightJudge: u8 = 30;
    pub const CommentPowerWeightCount: u8 = 65;
    pub const CommentPowerWeightCost: u8 = 20;
    pub const CommentPowerWeightPerCost: u8 = 10;
    pub const CommentPowerWeightPositive: u8 = 5;
    pub const CommentPowerWeight: u8 = 40;
    pub const DocumentPublishWeightParamsRate: u8 = 60;
    pub const DocumentPublishWeightParamsSelfRate: u8 = 40;
    pub const DocumentPublishWeightParamsAttendRate: u8 = 45;
    pub const DocumentIdentifyWeightParamsRate: u8 = 50;
    pub const DocumentIdentifyWeightCheckRate: u8 = 50;
    pub const DocumentIdentifyWeightConsistentRate: u8 = 45;
    pub const DocumentTryWeightBiasRate: u8 = 60;
    pub const DocumentTryWeightTrueRate: u8 = 40;
    pub const DocumentTryWeightConsistentRate: u8 = 45;
    pub const TopWeightProductPublish: u8 = 15;
    pub const TopWeightDocumentIdentify: u8 = 25;
    pub const TopWeightDocumentTry: u8 = 35;
    pub const TopWeightAccountAttend: u8 = 10;
    pub const TopWeightAccountStake: u8 = 15;

    // for CM
    pub const DocumentChooseWeightSellCount: u8 = 60;
    pub const DocumentChooseWeightTryCount: u8 = 40;

    pub const DocumentModelWeightProducerCount: u8 = 40;
    pub const DocumentModelWeightProductCount: u8 = 60;

    pub const DocumentCMPowerWeightAttend: u8 = 35;
    pub const DocumentCMPowerWeightContent: u8 = 30;
    pub const DocumentCMPowerWeightJudge: u8 = 30;
    pub const CMPowerAccountAttend: u8 = 5;

    pub const CommentCMPowerWeightCount: u8 = 65;
    pub const CommentCMPowerWeightCost: u8 = 20;
    pub const CommentCMPowerWeightPerCost: u8 = 10;
    pub const CommentCMPowerWeightPositive: u8 = 5;

    pub const AppLeaderBoardInterval: u32 = 5;
    pub const AppLeaderBoardMaxPos: u32 = 5;
    pub const AppFinanceExchangePeriod: u32 = 1;

    pub const ModelIncomeCyclePeriod: u32 = 1;
    pub const ModelIncomeCollectingPeriod: u32 = 1;
    pub const ModelIncomeRewardingPeriod: u32 = 1;
    pub const ModelDisputeDelayTime: u32 = 1;

    pub const ModelDisputeCycleCount: u32 = 10;
    pub const ModelDisputeCycleLv2IncreaseCount: u32 = 3;
    pub const ModelDisputeCycleLv3IncreaseCount: u32 = 6;

    pub const ModelDisputeRewardLv1: u64 = 15;
    pub const ModelDisputeRewardLv2: u64 = 150;
    pub const ModelDisputeRewardLv3: u64 = 150;

    pub const TreasuryModuleId: ModuleId = ModuleId(*b"py/trsry");

    pub const MaxFinanceMembers: u32 = 0;
    pub const MinFinanceMemberDeposit: u64 = 0;

    pub const RedeemFeeRate: u32 = 0;

    pub const CommentRewardNormalRate: u32 = 0;
    pub const CommentRewardExpertRate: u32 = 0;
}

impl system::Trait for Test {
    type BaseCallFilter = ();
    type Origin = Origin;
    type Call = ();
    type Index = u64;
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
    type MaximumExtrinsicWeight = ();
    type MaximumBlockLength = MaximumBlockLength;
    type AvailableBlockRatio = AvailableBlockRatio;
    type Version = ();
    type PalletInfo = ();
    type AccountData = pallet_balances::AccountData<u64>;
    type OnNewAccount = ();
    type OnKilledAccount = ();
    type SystemWeightInfo = ();
}

pub struct MockContains;
impl Contains<u64> for MockContains {
    fn sorted_members() -> Vec<u64> {
        vec![0]
    }
}

ord_parameter_types! {
    pub const One: u64 = 1;
    pub const Two: u64 = 2;
    pub const Three: u64 = 3;
    pub const Four: u64 = 4;
    pub const Five: u64 = 5;
    pub const Six: u64 = 6;
}

impl Trait for Test {
    type Event = TestEvent;
    type Currency = Balances;
    type Membership = members::Module<Test>;
    type TopWeightProductPublish = TopWeightProductPublish;
    type TopWeightDocumentIdentify = TopWeightDocumentIdentify;
    type TopWeightDocumentTry = TopWeightDocumentTry;
    type TopWeightAccountAttend = TopWeightAccountAttend;
    type TopWeightAccountStake = TopWeightAccountStake;
    type DocumentPowerWeightAttend = DocumentPowerWeightAttend;
    type DocumentPowerWeightContent = DocumentPowerWeightContent;
    type DocumentPowerWeightJudge = DocumentPowerWeightJudge;
    type CommentPowerWeightCount = CommentPowerWeightCount;
    type CommentPowerWeightCost = CommentPowerWeightCost;
    type CommentPowerWeightPerCost = CommentPowerWeightPerCost;
    type CommentPowerWeightPositive = CommentPowerWeightPositive;
    type CommentPowerWeight = CommentPowerWeight;
    type DocumentPublishWeightParamsRate = DocumentPublishWeightParamsRate;
    type DocumentPublishWeightParamsSelfRate = DocumentPublishWeightParamsSelfRate;
    type DocumentPublishWeightParamsAttendRate = DocumentPublishWeightParamsAttendRate;
    type DocumentIdentifyWeightParamsRate = DocumentIdentifyWeightParamsRate;
    type DocumentIdentifyWeightCheckRate = DocumentIdentifyWeightCheckRate;
    type DocumentIdentifyWeightConsistentRate = DocumentIdentifyWeightConsistentRate;
    type DocumentTryWeightBiasRate = DocumentTryWeightBiasRate;
    type DocumentTryWeightTrueRate = DocumentTryWeightTrueRate;
    type DocumentTryWeightConsistentRate = DocumentTryWeightConsistentRate;
    type DocumentChooseWeightSellCount = ();
    type DocumentChooseWeightTryCount = ();
    type DocumentModelWeightProducerCount = ();
    type DocumentModelWeightProductCount = ();
    type DocumentCMPowerWeightAttend = ();
    type DocumentCMPowerWeightContent = ();
    type DocumentCMPowerWeightJudge = ();
    type CommentCMPowerWeightCount = ();
    type CommentCMPowerWeightCost = ();
    type CommentCMPowerWeightPerCost = ();
    type CommentCMPowerWeightPositive = ();
    type CMPowerAccountAttend = ();
    type ModelCreateDeposit = ();
    type ModelCycleIncomeRewardTotal = ();
    type KptExchangeMinRate = ();
    type Slash = ();
    type AppLeaderBoardInterval = AppLeaderBoardInterval;
    type AppLeaderBoardMaxPos = AppLeaderBoardMaxPos;
    type Randomness = TestRandomness;
    type FinTreasuryModuleId = TreasuryModuleId;
    type ModTreasuryModuleId = TreasuryModuleId;
    type TechTreasuryModuleId = TreasuryModuleId;
    type TreasuryModuleId = TreasuryModuleId;
    type BurnDestination = ();
    type TechMembers = MockContains;
    type AppFinanceExchangePeriod = AppFinanceExchangePeriod;
    type ModelIncomeCollectingPeriod = ModelIncomeCollectingPeriod;
    type ModelIncomeCyclePeriod = ModelIncomeCyclePeriod;
    type ModelIncomeRewardingPeriod = ModelIncomeRewardingPeriod;
    type ModelDisputeLv1Slash = ();
    type ModelDisputeDelayTime = ModelDisputeDelayTime;
    type TechMemberOrigin = EnsureSignedBy<Two, u64>;
    type TechFundBase = ();
    type ModelDisputeCycleCount = ModelDisputeCycleCount;
    type ModelDisputeCycleLv2IncreaseCount = ModelDisputeCycleLv2IncreaseCount;
    type ModelDisputeCycleLv3IncreaseCount = ModelDisputeCycleLv3IncreaseCount;

    type ModelDisputeRewardLv1 = ModelDisputeRewardLv1;
    type ModelDisputeRewardLv2 = ModelDisputeRewardLv2;
    type ModelDisputeRewardLv3 = ModelDisputeRewardLv3;
    type RedeemFeeRate = RedeemFeeRate;

    type CommentRewardNormalRate = CommentRewardNormalRate;
    type CommentRewardExpertRate = CommentRewardExpertRate;
}

impl pallet_balances::Trait for Test {
    type Balance = u64;
    type DustRemoval = ();
    type Event = TestEvent;
    type ExistentialDeposit = ();
    type AccountStore = System;
    type WeightInfo = ();
    type MaxLocks = ();
}

impl members::Trait for Test {
    type Event = TestEvent;
    type Currency = Balances;
    type ModelCreatorCreateBenefit = ();
    type ModTreasuryModuleId = TreasuryModuleId;
    type MaxFinanceMembers = MaxFinanceMembers;
    type MinFinanceMemberDeposit = MinFinanceMemberDeposit;
}
pub type System = system::Module<Test>;
pub type Balances = pallet_balances::Module<Test>;

pub type KpModule = Module<Test>;

// This function basically just builds a genesis storage key/value store according to
// our desired mockup.
pub fn new_test_ext() -> sp_io::TestExternalities {
    system::GenesisConfig::default()
        .build_storage::<Test>()
        .unwrap()
        .into()
}

#[derive(Debug, PartialEq)]
pub struct TestStruct<T: Trait>(pub BalanceOf<T>);

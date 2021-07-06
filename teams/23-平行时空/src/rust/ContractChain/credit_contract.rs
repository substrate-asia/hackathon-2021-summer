#[ink::contract]
mod credit_contract_chain {

    #[ink::trait_definition]
    pub trait BaseCreditContract{
        // 发布合作契约（发布者Id，契约合同文件Hash）
        pub fn launch(demanderId:AccountId,contractDocumentHash:Hash,
            depositeCoins:Balance,arbitrateRatio:Balance,
            requireCredit:Balance)->Contract;
        // 契约被接受
        fn acceptedBy(laberId:AccountId)->boolean;
        // 契约被完成
        fn completed(laberId:AccountId, resultVoucher:Hash)->boolean;
        // 契约完成结果被确认
        fn confirmed(demanderId:AccountId)->boolean;
        // 计算本次交易的信用奖励值
        fn calculateTransactionCredit()->Balance;
        // 获取当前状态
        fn getState()->State;
    }

    struct Contract{
        demanderId:AccountId,
        contractDocumentHash:Hash,
        laberID:AccountId,
        resultVoucher:Hash,
        depositeCoins:Balance,
        arbitrateRatio:Balance,
        requireCredit:Balance,
        curState:State,
    }
    impl BaseCreditContract for Contract{
        // 发布契约
        pub fn launch(demanderId:AccountId,
            contractDocumentHash:Hash,
            depositeCoins:Balance,
            arbitrateRatio:Balance,
            requireCredit:Balance
        )->Contract{
            Contract{
                demanderId:demanderId,
                contractDocumentHash:contractDocumentHash,
                laberID:AccountId::default(),
                resultVoucher:Hash::default(),
                depositeCoins:depositeCoins,
                arbitrateRatio:arbitrateRatio,
                requireCredit:requireCredit,
                curState:State::LAUNCHED  
            }
        }
    }

    public boolean acceptedBy(BigInteger laberID) {
        this.laberID=laberID;
        curState=State.ACCEPTED;
        return true;
    }
    fn acceptedBy(laberId:AccountId)->boolean{
        this.laberID=laberID;
        curState=State.ACCEPTED;
        true
    }
    fn getState()->State{
        curState
    }
    // 契约被完成
    fn completed(laberId:AccountId, resultVoucher:Hash)->boolean{

    }
    // 契约完成结果被确认
    fn confirmed(&self,demanderId:AccountId)->boolean{
        if(self.laberID==laberId) return false;
        if(self.curState==State.ACCEPTED) return false;

        self.resultVoucher = resultVoucher;
        self.curState=State.COMPLETED;
        true
    }
    // 计算本次交易的信用奖励值
    fn calculateTransactionCredit(&self)->Balance{
        0.8f*depositeCoins
    }


    public Contract.State getState() {
        return curState;
    }

    public boolean completed(BigInteger laberId, BigInteger resultVoucher) {
        if(!this.laberID.equals(laberId)) return false;
        if(this.curState!=State.ACCEPTED) return false;

        this.resultVoucher = resultVoucher;
        this.curState=State.COMPLETED;
        return true;
    }

    public boolean confirmed(BigInteger demanderId, BigInteger contractId) {
        if(!this.demanderId.equals(demanderId)) return false;
        if(!this.getHash().equals(contractId)) return false;
        if(this.curState!=State.COMPLETED) return false;

        curState=State.CONFIRMED;
        return true;
    }

    public float calculateTransactionCredit() {

        return 0.8f*depositeCoins;
    }

}
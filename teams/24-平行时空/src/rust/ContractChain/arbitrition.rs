#[ink::contract]
mod credit_contract_chain {

    #[ink::trait_definition]
    pub trait BaseArbitrition{
        // 启动仲裁
        fn launchArbitrition(launcherId:AccountId)->impl BaseArbitrition;

        // 仲裁投票
        fn vote(voterId:AccountId)->boolean;

        // 仲裁结束
        fn finished()->boolean;
    }
    
    struct Arbitrition{
        launcherId:AccountId;
        voterMap:StorageHashMap<AccountId, Balance>,
        result:boolean,
    } 

    impl BaseArbitrition for Arbitrition{
        // 启动仲裁
        fn launchArbitrition(launcherId:AccountId)->impl BaseArbitrition{
            Arbitrition{
                launcherId:AccountId,
                voterMap:StorageHashMap<AccountId, Balance>::new(),
                result:false
            }
        }

        // 仲裁投票
        fn vote(voterId:AccountId)->boolean{
            false;
        }

        // 仲裁结束
        fn finished()->boolean{
            false
        }
        
    }

}
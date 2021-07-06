#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod PubCommentsChain {

    //参评者信息
    #[ink(storage)]
    pub struct Participant {
        evaScore: f32,
        forecastBoxOffice: u64,
        participantfee: u64,
        participantRankScore u64,

    }

    //每场电影评定活动信息
    #[ink(storage)]
    pub struct EvaActivity {
    
        sponsor: storage::Value<AccountId>,//活动发起者
        filmScore: u8, //影评
        darkHorseNum: u8,//黑马指数
        //1表示评定状态（加密提交评定阶段）；2表示加密数据解密阶段（明文提交评定阶段） 3.等待阶段 4.表示活动彻底关闭阶段
        activityState: u8,
        participateNum: u32, //参与人数
        participateAgainNum: u32,
        bonus: storage::Value<Balance>,
        pollToken: u32, 
        pollDOT: u32, //DOT奖金池
        totalScore: u64,//该电影所有参与者的影评总分
        totalForecastBoxOffice: u64,//总的票房预测，单位为万，
        realFilmBoxOffice: u64,  //实际票房
        participantDataMap: storage::HashMap<AccountId,PubCommentsChain::Participant>,//所有参与者评分映射。
        participantAddress: Vec<AccountId>, //用于获得上述map中所有元素
        //参与者排名，之所以不放到上面的参与者数据中是因为排名只需要前30%即可，这样可以节省一些数据
        partticipantRank: storage::HashMap<AccountId,u32>

    }

  


    // / Defines the storage of your contract. - huanglong
    #[ink(storage)]
    pub struct PubCommentsChain {
        // 技术地址
        techAddr: storage::Value<AccountId>,
        //技术地址拿的总额度
        totalTechAmount:  storage::Value<Balance>,
         // 电影ID => 评定活动数据
        filmEvaActivityMap: storage::HashMap<String,PubCommentsChain::EvaActivity>,
        //地址=>参评者数据。
        participantMap: storage::HashMap<AccountId,PubCommentsChain::Participant>,
        //用户拥有的未提现token.之所以要这个是为了用户积累到一定数目的token后再进行体现，减少网络费用。
        participantOwnTokenMap: storage::HashMap<AccountId,Balance>,
        filmBeEvaNum: u64,

    }
    //添加一些事件
    #[ink(event)]
    struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        #[ink(topic)]
        value: Balance,
    }

  
    impl PubCommentsChain {
        // / Constructor func before 550loc - tanglinfeng
       
        // 构造函数
        #[ink(constructor)]
        pub fn constructor(&mut self, _techAddr:AccountId) -> {  // 高版本不需要public
            self.techAddr = _techAddr;
            return true;
        }

        /**
         * @dev 发起评定活动。
         * @param filmId 电影ID
         */
        #[ink(message)]
        fn createEvaActivityWithToken(&self,filmId:String,  value:Balance) ->bool{  //注意在智能合约中如果函数添加payable，那么就会在生成封装类时会自动把value这个参数加入到入参中。
           if(value>=10){
            //看是否需要注册 
            // filmEvaActivityMap[filmId].tokenPoll+=value;
            //下面的有问题。
            // SafeMath.add(FilmEvaActivity[filmId].tokenPoll,value);
            let msgSender = self.env().caller(); //消息发送者

            //需要先创建activityMAP!!!,这里有点不一样。
            let evaActivity:PubCommentsChain::EvaActivity;
            self.filmEvaActivityMap.insert(filmId,evaActivity);


            let mut tokenPoll=self.filmEvaActivityMap.get(filmId).pollToken+value;
            self.filmEvaActivityMap.get(filmId).pollToken=tokenPoll;
            // address  sponsorAddress=msg.sender;
            // address payable sponsorAddress2=address( uint160(sponsorAddress));
            // FilmEvaActivity[filmId].sponsor=address( uint160(sponsorAddress));
            self.filmEvaActivityMap.get(filmId).sponsor=msgSender;
    
            //token的bonus是否需要？？
            //这里可能需要判别一下当前是否已经有owner及bonus了
            // FilmEvaActivity[filmId].bonus=_eth;
            self.filmEvaActivityMap.get(filmId).activityState=1;    //评定进行状态
            //还需要记录一下结束时间。包括评定二次提交时间。
            return true;
           }
           return false;
        }

        //把DOT作为活动发起奖金
        #[ink(message)]
        fn createEvaActivityBonusDOT(&self,filmId:String,  value:Balance) ->bool {   //活动发起者可以参考这个函数
          if(value>0){
            let msgSender = self.env().caller(); //消息发送者
    
            self.filmEvaActivityMap.get(filmId).ethPoll=filmEvaActivityMap[filmId].ethPoll.add(msg.value);
             let mut pollDOT=self.filmEvaActivityMap.get(filmId).pollDOT+value;
             self.filmEvaActivityMap.get(filmId).pollDOT=pollDOT;
             //这里可能需要判别一下当前是否已经有owner及bonus了
             self.filmEvaActivityMap.get(filmId).bonus=value;
     
             // //注册用户
             // register(msgSender, _superiorAddr);  //之所以需要这个是因为这个可以直接发起，当庄时必须要是注册用户。
             return true;
          }
          return false;
        }


        //这个状态是根据时间段来调用设置的，
        #[ink(message)]
        fn setActivityState(&self,filmId:String, activityState: u8)->bool{

            //注意切换到状态2时必须保证参与人数达到最小值1000以上，不然活动失败，返还所有参与人的费用。
            self.filmEvaActivityMap.get(filmId).activityState=activityState;
            // if((self.filmEvaActivityMap.get(filmId).activityState==3)&&(activityState==4)){ //活动顺利完成
            //    let filmBeEvaNum=self.filmBeEvaNum+1;
            //     self.filmBeEvaNum=filmBeEvaNum;
            // }
            return true;
        }
                
        /**
            * @dev 争夺发起者，创建合约及争夺时都可以调用这个函数
            * @param filmId 电影Id
        */
        #[ink(message)]
        fn sponsorFight(&self,filmId:String,value:Balance) ->bool {      //注意bonus需要统一一下到底是用什么币或者多种币
 
            let msgSender = self.env().caller(); //消息发送者
            if(self.filmEvaActivityMap.get(filmId).activityState!=4){
                // 调用撤回资金的核心方法
                // uint _ethBonus=msg.value;
                
                if(value>self.filmEvaActivityMap.get(filmId).bonus){
                    if(self.filmEvaActivityMap.get(filmId).bonus.bonus!=0){
                        // 返还出价时，简单地直接调用 highestBidder.send(highestBid) 函数，
                                // 是有安全风险的，因为它有可能执行一个非信任合约。
                                // 更为安全的做法是让接收方自己提取金钱。
                        // sponsorReturns[FilmEvaActivity[filmId].sponsor] += FilmEvaActivity[filmId].bonus; //活动的发起者退回到原先发起者的转户资金处
                        // FilmEvaActivity[filmId].sponsor.transfer(FilmEvaActivity[filmId].bonus);  //直接发送
                        self.filmEvaActivityMap.get(filmId).bonus=value;
                        let pollDOT=self.filmEvaActivityMap.get(filmId).pollDOT-self.filmEvaActivityMap.get(filmId).bonus;
                        self.filmEvaActivityMap.get(filmId).pollDOT =pollDOT;   //奖金池先减去原来bonus
                    }
                    // payable(msgSender).transfervalue);   //真实转账操作
                    self.filmEvaActivityMap.get(filmId).bonus=value;
                    //奖金池改变
                    let pollDOT=self.filmEvaActivityMap.get(filmId).pollDOT+value;
                    self.filmEvaActivityMap.get(filmId).pollDOT =pollDOT;  //奖金池再加上新的bonus
                    self.filmEvaActivityMap.get(filmId).sponsor=msgSender;   
                    return true;
                }
            }
            return false;
          
        }


        //首次提交加密评定
        #[ink(message)]
        fn participateActivityWithBlind(&self,filmId:String, _hashScore:u32, _hashBoxOffice:u32, feeValue:Balance)->bool {
            
            if((self.filmEvaActivityMap.get(filmId)==1) &&(feeValue>1)){
                let msgSender = self.env().caller(); //消息发送者
                 //获得参与者数据
                // let  participantData=self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender);
                self.filmEvaActivityMap.get(filmId).participantAddress.push(msg.sender); //记录所有地址数据
                // ButtToken(_tokenAddr).transfer(address(this), feeValue); //token实际转账，这里就必须先把账转到Token合约中，这样才能再转到本合约中
                
                self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).hashEvaScore=_hashScore;
                self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).hashForecastBoxOffice=_hashBoxOffice;
                self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).participantfee=feeValue;  //这个费用是扣除转账费用后的参加评定的费用
                //下面数据必须在提交加密数据时就赋值，这些值需要较早的显示。
                let participateNum=self.filmEvaActivityMap.get(filmId).participateNum+1;
                filmEvaActivityMap[filmId].participateNum =participateNum;
                //资金池需要修改
                let pollToken=filmEvaActivityMap[filmId].pollToken+feeValue;
                filmEvaActivityMap[filmId].tokenPoll=pollToken; 
                return true;
            }
           return false;
        }
            

        //第二次提交明文评定 。为了让用户体验更好，用户可以托管自己的评定到中心化后台，也可以自己在规定时间二次提交（加密数据一起都可以托管过来，）
        #[ink(message)]
        fn participateActivityWithReveal(&self,filmId:String, score:u32, forecastBoxOffice:u32) ->bool {
            //检验活动是否在进行
            if(self.filmEvaActivityMap.get(filmId).activityState==2){
                //注意这里还要实现加密加密校验!!!!!!!!!

                let msgSender = self.env().caller(); //消息发送者

                 //引用变量
                // Data.ParticipantActivityData storage participantData=filmEvaActivityMap[filmId].participantDataMap[msg.sender];
                self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).evaScore=score;
                self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).forecastBoxOffice=forecastBoxOffice;

                let totalScore=self.filmEvaActivityMap.get(filmId).totalScore+score;
                self.filmEvaActivityMap.get(filmId).totalScore =totalScore;
                let totalForecastBoxOffice=self.filmEvaActivityMap.get(filmId).totalForecastBoxOffice+forecastBoxOffice;
                self.filmEvaActivityMap.get(filmId).totalForecastBoxOffice =totalForecastBoxOffice;
                let participateAgainNum=self.filmEvaActivityMap.get(filmId).participateAgainNum+1;
                self.filmEvaActivityMap.get(filmId).participateAgainNum =participateAgainNum;
                return true;
            }
           return false;
            //加一个事件监听结果
        }

        /**
            评定阶段结束。
        */
        #[ink(message)]
        fn EvaActivityEnd(&self,filmId:String) ->bool{
            //这里做一个时间判断，保证安全。
            // require（block.timestamp>=FilmEvaActivity[filmId].endTime,"Evaluate activity has not reach the end time"）;
            //活动必须处在revual阶段才可以进行结束
            require(FilmEvaActivity[filmId].activityState!=2, "Evaluate state has already end.");
            if( self.filmEvaActivityMap.get(filmId).activityState!=2 ){
                self.filmEvaActivityMap.get(filmId).activityState=3;
                //触发评分计算函数。
                calculateFilmScore(filmId);

                let filmBeEvaNum=self.filmEvaActivityMap.get(filmId).filmBeEvaNum+1;
                self.filmEvaActivityMap.get(filmId).filmBeEvaNum=filmBeEvaNum; //一次评定完成，统计已经评定电影次数。
                return true;
            }
           return false;
        }


        
        //let calcuateFactor: u32= 100; // 浮点计算放大因子，也就是说只保留两位小数。最终在最终值中除以100即可。
        // 票房折合函数，实现票房折合为票房分,这个需要根据票房的实际数据确定函数，目前暂定一个线性函数
        #[ink(message)]
        pub fn boxoffice2Score(&self, BoxOffice: u32) -> u32 { // 注意传入的票房单位为：千万
            let mut boxOfficeScore: u32= 0;
            if BoxOffice < 100 {
                boxOfficeScore = BoxOffice/25 +3;
            } else {
                boxOfficeScore = 10;
            }
            return boxOfficeScore;
        }


        // 影评计算函数
        pub fn calculateFilmScore(&self, filmId:String) {
            // 计算平均分,需要实现浮点数据，数据类型后面具体解决
            let averageScore: u32 = self.filmEvaActivityMap.get(filmId).totalScore/self.filmEvaActivityMap.get(filmId).participateAgainNum;
            let averageForecastBoxOffice: u32 = self.filmEvaActivityMap.get(filmId).totalForecastBoxOffice/self.filmEvaActivityMap.get(filmId).participateAgainNum;

            // 计算最终影评分，当前采用线性函数进行关联两个因子
            let boxOfficeScore: u32 = boxoffice2Score(averageForecastBoxOffice);
             // 根据平均主观评分和折算的票房预测分折算为最终的影评评分。
            // 由于涉及到浮点数，且这部分为独立函数，后面找到最优浮点数计算方法后补充即可。
            // if ){
            // }
            //  FilmEvaActivity[filmId].filmScore=
        }


        // 这个函数的触发有两种方案：一个是中心化触发，一个是去中心化触发。
        // 电影下映或者达到最长时间时触发实际票房上传
        #[ink(message)]
        pub fn setFilmRealBoxOffice(&self, filmId:String, realBoxOffice: u32) {
            self.filmEvaActivityMap.get(filmId).realFilmBoxOffice=realBoxOffice;
            // 调用参评者排名得分函数
            calculateRankScore(filmId);

            // 调用计算排名函数

            // 获得挖矿奖励
            getTokenReward(filmId);

            // 根据获奖名单排名分发所有奖励

            // 活动策底结束
        }



        // 奖励算法
        pub fn calculateRankScore(&self, filmId:String) { 
            // 下述权重化为整型，解决浮点问题
            let subWeight: u32 = 4; // 主观评分权重  
            let objWeight: u32 = 2; // 客观票房预测权重
            let subAndObjWeight: u32 = 4; // 主客观权重
            let AvFactory: u32 = 500; // 放大因子
            let mut scoreCoefficient: u32;
            let mut boxOfficeCoefficient: u32;
            let mut subAndObjCoefficient: u32;
            let mut averageScore: u32 = self.filmEvaActivityMap.get(filmId).totalScore/self.filmEvaActivityMap.get(filmId).participateAgainNum;
            let mut averageForecastBoxOffice: u32 = self.filmEvaActivityMap.get(filmId).totalForecastBoxOffice/self.filmEvaActivityMap.get(filmId).participateAgainNum;
            let mut realFilmBoxOfficeScore: u32 = boxoffice2Score(self.filmEvaActivityMap.get(filmId).realFilmBoxOffice); // 把实际票房转换为票房分
            
            // 这里分数暂时有最简单的线性除法计算各个因子的得分值。
            let mut i = 0;
            while i < self.filmEvaActivityMap.get(filmId).participantAddress.len() {
                i += 1;
                // 变量引用
                let msgSender = self.env().caller(); //消息发送者
                //Data.ParticipantActivityData participantData=self.filmEvaActivityMap.get(filmId).participantDataMap[self.filmEvaActivityMap.get(filmId).participantAddress[i]];
                if (self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).evaScore != 0) && (self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).forecastBoxOffice != 0) {
                    let participantScore: u32 = self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).evaScore;
                    let participantBoxOffice: u32 = self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).forecastBoxOffice;
                    let forecastBoxOfficeScore: u32 = boxoffice2Score(participantBoxOffice);
                    let averageScoreBoxOffice: u32 = (participantScore+forecastBoxOfficeScore)/2;
                    if participantScore<averageScore{
                        scoreCoefficient = subWeight*AvFactory*(averageScore-participantScore)/averageScore;
                    } else {
                        scoreCoefficient = subWeight*AvFactory*(participantScore-averageScore)/averageScore;
                    }
                    if participantBoxOffice < averageForecastBoxOffice{
                        boxOfficeCoefficient = objWeight*AvFactory*(averageForecastBoxOffice-participantBoxOffice)/averageForecastBoxOffice;
                    } else {
                        boxOfficeCoefficient = objWeight*AvFactory*(participantBoxOffice-averageForecastBoxOffice)/averageForecastBoxOffice;
                    }
                    // 主客观误差，先按照最简单的方法实现
                    if averageScoreBoxOffice<realFilmBoxOfficeScore){
                        subAndObjCoefficient=(realFilmBoxOfficeScore-averageScoreBoxOffice) / realFilmBoxOfficeScore;
                    }else{
                        subAndObjCoefficient=(averageScoreBoxOffice-realFilmBoxOfficeScore) / realFilmBoxOfficeScore;
                    }
                    self.filmEvaActivityMap.get(filmId).participantDataMap.get(msgSender).participantRankScore = scoreCoefficient+boxOfficeCoefficient+subAndObjCoefficient;
                }
            }
        }

        

        // 根据最终影评、实际票房及参与人数计算token挖矿收益并放入到奖金池中。
        #[ink(message)]
        pub fn getTokenReward(&self, filmId:String, realBoxOffice: u32) {
            let reduceNumConstant: u8 = 200;  // 每200部电影减半一次
            let startTokenNum: u32 = 45000000;  // 9千万进行挖矿，一千万进行预挖
            let participantsMin: u32 = 1000;
            let averageBoxOfficInBase: u32 = 50; // 影视库中的均值票房5亿
            let filmScore:u8 = self.filmEvaActivityMap.get(filmId).filmScore;
            let filmBoxOffice: u32 = self.filmEvaActivityMap.get(filmId).realFilmBoxOffice;
            let participants: u32 = self.filmEvaActivityMap.get(filmId).participateNum;
            let reduceNum: u32 = self.filmEvaActivityMap.get(filmId).filmBeEvaNum/reduceNumConstant;  
            // 根据减半情况，计算本次影评能够挖到矿的总额。
            // let countNum=reduceNum<<1; // 2^reduceNum
            let averageToken: u32 =startTokenNum/2.pow(reduceNum);

            // 影响因子的乘机
            let mut tokenCalcuateNum: u32 = (participants/participantsMin)*(filmBoxOffice/averageBoxOfficInBase)*(filmScore/5);
            // 按照对数对tokenCalcuateNum计算数值
            let mut logCalculateNum: u32 ;
            if tokenCalcuateNum>=2.pow(128) {tokenCalcuateNum>>=128;logCalculateNum+=128;}
            if tokenCalcuateNum>=2.pow(64) {tokenCalcuateNum>>=64;logCalculateNum+=64;}
            if tokenCalcuateNum>=2.pow(32) {tokenCalcuateNum>>=32;logCalculateNum+=32;}
            if tokenCalcuateNum>=2.pow(16) {tokenCalcuateNum>>=16;logCalculateNum+=16;}
            if tokenCalcuateNum>=2.pow(8) {tokenCalcuateNum>>=8;logCalculateNum+=8;}
            if tokenCalcuateNum>=2.pow(4) {tokenCalcuateNum>>=4;logCalculateNum+=4;}
            if tokenCalcuateNum>=2.pow(2) {tokenCalcuateNum>>=2;logCalculateNum+=2;}
            if tokenCalcuateNum>=2pow(1) {/*x>>=1;*/logCalculateNum+=1;}

            let tokenReward = averageToken+averageToken*logCalculateNum;
            self.filmEvaActivityMap.get(filmId).tokenPoll+=tokenReward;
        }
        
        // 用户自己触发获得奖励。该函数触发涉及转账是需要消耗
        #[ink(message)]
        pub fn getReward(_tokenAddr: address, to: address){
            ButtToken(_tokenAddr).distrabuteToken(to,participantOwnerTokenMap[to]);
        }

        // 获取对应活动的数据，主要是全局数据，参与人、评定数据等，放到一起一次性获得。
        #[ink(message)]
        pub fn getParticipantNum(&self, filmId:String) -> u32{
            return self.filmEvaActivityMap.get(filmId).participateNum;
        }
      
        #[ink(message)]
        pub fn getTokenPoll(filmId: memory) -> u32{
            FilmEvaActivity[filmId].tokenPoll;
        }

        #[ink(message)]
        pub fn getEvaActivityData(filmId: memory) -> u32{
            FilmEvaActivity[filmId].tokenPoll;
        }

        // getEvaActivityData和getParticipantActivityData多返回值待处理

    }


      // / Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    // / module and test functions are marked with a `#[test]` attribute.
    // / The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        // / Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        // / Imports `ink_lang` so we can use `#[ink::test]`.
        use ink_lang as ink;

        // / We test if the default constructor does its job.
        #[ink::test]
        fn test_createEvaActivityWithToken() {
            assert_eq!(PubCommentsChain.createEvaActivityWithToken("20210520GZJ",100), true);
        }
        #[ink::test]
        fn test_setActivityState() {
            assert_eq!(PubCommentsChain.setActivityState("20210520GZJ",1), true);
        }
        
        #[ink::test]
        fn test_sponsorFight() {
            assert_eq!(PubCommentsChain.sponsorFight("20210520GZJ",20), true);
        }
        #[ink::test]
        fn test_participateActivityWithReveal() {
            assert_eq!(PubCommentsChain.participateActivityWithReveal("20210520GZJ",8,100000), true);
        }
    }
}

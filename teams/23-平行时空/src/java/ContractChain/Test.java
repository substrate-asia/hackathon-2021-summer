package ContractChain;

import java.math.BigInteger;

public class Test {
    public static void main(String[] args) {
        boolean testAfterSaleProcess = true;
        boolean testArbitration = true;

        Demander demanderA = new Demander();
        BigInteger contractDocumentHash = BigInteger.valueOf(192102);
        float depositeCoins = 3000.00f;
        float arbitrateRatio = 0.1f;
        float requireTrust = depositeCoins * 5;
        BigInteger contractId = demanderA.launchContract(contractDocumentHash, depositeCoins, arbitrateRatio, requireTrust);

        ProvideLaber laber = new ProvideLaber();

        // 查看 合约内容.
        // 接受合约
        try {
            laber.acceptContract(contractId);
        } catch (ContractIdNotExist contractIdNotExist) {
            contractIdNotExist.printStackTrace();
        }
        // 完成任务，并提交合约。
        laber.finishedContract(contractId);
        if (testAfterSaleProcess) {
            // 甲方审核结果，并对结果提出售后修改意见
            BigInteger afterSaleOpinion = BigInteger.valueOf(12);
            demanderA.requsetAfterSale(contractId, afterSaleOpinion);

            laber.acceptAferSale(contractId, afterSaleOpinion);
            laber.finishedAfterSale(contractId, afterSaleOpinion);
        }

        if (testArbitration) {
            // 甲方不满意结果，请求大众仲裁
            String demanderComplain = "结果不满足契约第2条要求";
            demanderA.askForArbitration(contractId, demanderComplain);


            String laberDefend = "第二条的理由为无效理由";
            laber.defendForArbitration(contractId, laberDefend);

            // 大众会在区块链浏览器中看到这一仲裁投票信息
            Voter voter1 = new Voter();
            voter1.vote(contractId, Voter.VOTE_LABER,10.0f);
            Voter voter2 = new Voter();
            voter2.vote(contractId, Voter.VOTE_DEMANDER, 8.0f);
            Voter voter3 = new Voter();
            voter3.vote(contractId, Voter.VOTE_LABER, 1.5f);
            Voter voter4 = new Voter();
            voter4.vote(contractId, Voter.VOTE_LABER, 2.0f);



        } else {

            demanderA.confirmContract(contractId);
        }


    }
}

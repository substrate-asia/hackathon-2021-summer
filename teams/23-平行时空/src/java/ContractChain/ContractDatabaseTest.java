package ContractChain;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.math.BigInteger;
import java.util.Random;

public class ContractDatabaseTest {
    BigInteger demanderId;
    BigInteger contractId;
    BigInteger laberId;
    ContractDatabase database;
    @Before
    public void before(){
        database=ContractDatabase.getInstance();
        demanderId=new BigInteger(128,new Random());
        laberId=new BigInteger(128,(new Random()));

        database.transfer(database.bankId,demanderId,1000);
        database.transfer(database.bankId,laberId,1000);


    }

    @After
    public void after(){

    }

    @Test
    public void launchContract() {
        BigInteger contractDocumentHash = BigInteger.valueOf(192102);
        float depositeCoins = 3000.00f;
        float arbitrateRatio = 0.1f;
        float requireTrust = 0.f;
        contractId = database.launchContract(demanderId, contractDocumentHash, depositeCoins, arbitrateRatio, requireTrust);
        System.out.println(contractId);
        System.out.println(database.getContractState(contractId));

    }

    @Test
    public void acceptContract() {
        BigInteger contractDocumentHash = BigInteger.valueOf(192102);
        float depositeCoins = 3000.00f;
        float arbitrateRatio = 0.1f;
        float requireTrust = 0.f;
        contractId = database.launchContract(demanderId, contractDocumentHash, depositeCoins, arbitrateRatio, requireTrust);
        System.out.println(contractId);
        // 接受合约
        database.acceptContract(laberId,contractId);
        System.out.println(database.getContractState(contractId));
    }


    @Test
    public void finishedContract() {
        BigInteger contractDocumentHash = BigInteger.valueOf(192102);
        float depositeCoins = 3000.00f;
        float arbitrateRatio = 0.1f;
        float requireTrust = 0.f;
        contractId = database.launchContract(demanderId, contractDocumentHash, depositeCoins, arbitrateRatio, requireTrust);
        System.out.println(contractId);
        // 接受合约
        database.acceptContract(laberId,contractId);
        // 完成任务，并提交合约。
        BigInteger resultVoucher = new BigInteger(129,new Random());
        database.finishedContract(laberId,contractId,resultVoucher);
        System.out.println(database.getContractState(contractId));
    }



    @Test
    public void confirmContract() {
        BigInteger contractDocumentHash = BigInteger.valueOf(192102);
        float depositeCoins = 300.00f;
        float arbitrateRatio = 0.1f;
        float requireTrust = 0.f;
        contractId = database.launchContract(demanderId, contractDocumentHash, depositeCoins, arbitrateRatio, requireTrust);
        System.out.println(contractId);
        // 接受合约
        database.acceptContract(laberId,contractId);
        // 完成任务，并提交合约。
        BigInteger resultVoucher = new BigInteger(129,new Random());
        database.finishedContract(laberId,contractId,resultVoucher);
        System.out.println("Before confirm: demander account "+database.balanceOf(demanderId)+" credit "+database.availiableCreditOf(demanderId)+"; laber account "+database.balanceOf(laberId)+ " credit "+database.availiableCreditOf(laberId));
        // 需求方确认结果，放行质押币
        database.confirmResultContract(demanderId,contractId);
        System.out.println("After confirm: demander account "+database.balanceOf(demanderId)+" credit "+database.availiableCreditOf(demanderId)                +"; laber account "+database.balanceOf(laberId)+ " credit "+database.availiableCreditOf(laberId));
        System.out.println(database.getContractState(contractId));
    }
}
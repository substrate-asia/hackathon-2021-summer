package ContractChain;

import java.math.BigInteger;

public class Demander {
    BigInteger demanderId;

    public BigInteger launchContract(BigInteger contractDocumentHash, float depositeCoins, float arbitrateRatio,float requireTrust){
        return ContractDatabase.getInstance().launchContract(demanderId, contractDocumentHash, depositeCoins, arbitrateRatio, requireTrust);
    };
    public void confirmContract(BigInteger contractId){};
    public void refuseContract(){};
    public void requsetAfterSale(BigInteger id, BigInteger contractId){};

    public void askForArbitration(BigInteger contractId, String complain) {
    }
}

package ContractChain;

import java.math.BigInteger;

public class ProvideLaber  {
    BigInteger mAddressId;
    ContractDatabase database;
    public ProvideLaber(){
        database =ContractDatabase.getInstance();
    }
    public boolean acceptContract(BigInteger contractId) throws ContractIdNotExist {
        if( ContractDatabase.getInstance().getContractRequireCredit(contractId)<=database.availiableCreditOf(mAddressId)){
            return ContractDatabase.getInstance().acceptContract(mAddressId,contractId);
        }
        return false;
    };
    public void finishedContract(BigInteger contractId){};

    public void acceptAferSale(BigInteger contractId, BigInteger afterSaleOpinion) {
    }

    public void finishedAfterSale(BigInteger contractId, BigInteger afterSaleOpinion) {
    }

    public void defendForArbitration(BigInteger contractId, String laberDefend) {
    }
}

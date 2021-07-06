package ContractChain;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class ContractDatabase {
    Map<BigInteger, Contract> contractMap;
    Map<BigInteger, Address> addressMap;
    public  BigInteger bankId;
    // Signaton
    private static ContractDatabase instance = new ContractDatabase();


    private ContractDatabase() {
        contractMap = new HashMap<BigInteger, Contract>();
        addressMap = new HashMap<BigInteger, Address>();
        createNewAddress(bankId,1000000,1000);
    }

    public float balanceOf(BigInteger addressId) {
        return addressMap.get(addressId).getAccount();
    }

    public float availiableCreditOf(BigInteger addressId) {
        return addressMap.get(addressId).getAvailiableCredit();
    }

    public boolean transfer(BigInteger from, BigInteger to, float value) {
        if (balanceOf(from) < value) return false;

        addressMap.get(from).giveOut(value);
        if (addressMap.containsKey(to)) {
            addressMap.get(to).receive(value);

        } else {
            createNewAddress(to, value,0);
        }
        return true;
    }

    private void createNewAddress(BigInteger addressId, float value,float credit) {
        Address address = new Address(addressId);
        address.receive(value);
        address.improveCredit(credit);
        addressMap.put(address.getAddressId(), address);
    }

    public static ContractDatabase getInstance() {
        return instance;
    }

    public void addNewContract() {

    }

    public BigInteger launchContract(BigInteger demanderId, BigInteger contractDocumentHash, float depositeCoins, float arbitrateRatio, float requireTrust) {
        if (!addressMap.containsKey(demanderId)) {
            return BigInteger.ZERO;
        } else {
            Contract contract = new Contract(demanderId, depositeCoins, arbitrateRatio, requireTrust);
            contractMap.put(contract.getHash(), contract);
            return contract.getHash();
        }

    }

    public float getContractRequireCredit(BigInteger contractId) throws ContractIdNotExist {
        if (contractMap.containsKey(contractId)) {
            return contractMap.get(contractId).getRequireCredit();
        } else {
            throw new ContractIdNotExist();
        }
    }

    public boolean acceptContract(BigInteger laberAddressId, BigInteger contractId) {
        // Verify condition.
        if (!contractMap.containsKey(contractId)) return false;
        if(contractMap.get(contractId).getState()!= Contract.State.LAUNCHED) return false;
        if (!addressMap.containsKey(laberAddressId)) return false;
        float requireCredit = contractMap.get(contractId).getRequireCredit();
        Address laberAddress = addressMap.get(laberAddressId);
        if (laberAddress.getAvailiableCredit() < requireCredit) return false;
        // Process account
        laberAddress.lockCredit(requireCredit);

        return contractMap.get(contractId).acceptedBy(laberAddress.getAddressId());
    }

    public Contract.State getContractState(BigInteger contractId) {
        return contractMap.get(contractId).getState();
    }

    public boolean finishedContract(BigInteger laberId, BigInteger contractId,BigInteger resultVoucher) {
        if(!addressMap.containsKey(laberId)) return false;
        if(!contractMap.containsKey(contractId)) return false;

        Contract contract=contractMap.get(contractId);
        return contract.completed(laberId,resultVoucher);

    }

    public boolean confirmResultContract(BigInteger demanderId, BigInteger contractId) {
        if(!addressMap.containsKey(demanderId)) return false;
        if(!contractMap.containsKey(contractId)) return false;

        Contract contract=contractMap.get(contractId);

        boolean isConfirmed= contractMap.get(contractId).confirmed(demanderId,contractId);
        if(isConfirmed){
            BigInteger laberId= contract.getLaberID();
            // 转账
            if(!transfer(contract.getDemanderId(),laberId,contract.getDepositeCoins())) return false;
            // 添加信用
            float transactionCredit= contract.calculateTransactionCredit();
            addressMap.get(laberId).unlockCredit(contract.getRequireCredit());
            addressMap.get(laberId).improveCredit(transactionCredit);
            addressMap.get(contract.getDemanderId()).improveCredit(transactionCredit);
            return true;
        }else {
            return false;
        }
    }


    private class Address {
        private BigInteger addressId;
        private float account;
        private float lockedCredit;
        private float availiableCredit;


        public Address() {
            account = 0;
            availiableCredit = 0;
            lockedCredit = 0;
            addressId = new BigInteger(128, new Random());
        }

        public Address(BigInteger addressId) {
            account = 0;
            availiableCredit = 0;
            lockedCredit = 0;
            this.addressId = addressId;
        }

        public boolean lockCredit(float lockValue) {
            if (availiableCredit > lockValue) {
                availiableCredit -= lockValue;
                lockedCredit += lockValue;
                return true;
            } else
                return false;
        }

        public float getAvailiableCredit() {
            return availiableCredit;
        }

        public BigInteger getAddressId() {
            return addressId;
        }

        public float getAccount() {
            return account;
        }

        public boolean giveOut(float value) {
            if (account < value) return false;
            account -= value;
            return true;
        }

        public void receive(float value) {
            account += value;
        }

        public void improveCredit(float credit) {
            availiableCredit+=credit;
        }

        public void unlockCredit(float credit) {
            availiableCredit+=credit;
            lockedCredit-=credit;
        }
    }

}

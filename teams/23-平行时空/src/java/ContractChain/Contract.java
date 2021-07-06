package ContractChain;

import java.math.BigInteger;


public class Contract {


    private BigInteger demanderId;
    private BigInteger laberID;
    private BigInteger resultVoucher;
    private float depositeCoins;
    private float arbitrateRatio;
    private float requireCredit;
    private State curState;

    public boolean acceptedBy(BigInteger laberID) {
        this.laberID=laberID;
        curState=State.ACCEPTED;
        return true;
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

    public  enum State{
        LAUNCHED,
        ACCEPTED,
        COMPLETED,
        CONFIRMED
    }
    // 发布契约
    public Contract(BigInteger demanderId, float depositeCoins, float arbitrateRatio, float requireTrust) {
        this.demanderId=demanderId;
        this.depositeCoins=depositeCoins;
        this.arbitrateRatio=arbitrateRatio;
        this.requireCredit =requireTrust;
        curState=State.LAUNCHED;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Contract contract = (Contract) o;

        if (Float.compare(contract.depositeCoins, depositeCoins) != 0) return false;
        if (Float.compare(contract.arbitrateRatio, arbitrateRatio) != 0) return false;
        if (Float.compare(contract.requireCredit, requireCredit) != 0) return false;
        return demanderId.equals(contract.demanderId);
    }

    @Override
    public int hashCode() {
        int result = demanderId.hashCode();
        result = 31 * result + (depositeCoins != +0.0f ? Float.floatToIntBits(depositeCoins) : 0);
        result = 31 * result + (arbitrateRatio != +0.0f ? Float.floatToIntBits(arbitrateRatio) : 0);
        result = 31 * result + (requireCredit != +0.0f ? Float.floatToIntBits(requireCredit) : 0);
        return result;
    }

    public BigInteger getHash() {
        return BigInteger.valueOf(hashCode());
    }

    public float getRequireCredit() {
        return requireCredit;
    }
    public BigInteger getDemanderId() {
        return demanderId;
    }

    public BigInteger getLaberID() {
        return laberID;
    }

    public BigInteger getResultVoucher() {
        return resultVoucher;
    }

    public float getDepositeCoins() {
        return depositeCoins;
    }

    public float getArbitrateRatio() {
        return arbitrateRatio;
    }

    public State getCurState() {
        return curState;
    }
}


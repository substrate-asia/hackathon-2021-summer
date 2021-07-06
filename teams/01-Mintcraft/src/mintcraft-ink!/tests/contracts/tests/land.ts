import { expect } from "chai";
import { artifacts, network, patract } from "redspot";

const { getContractFactory, getRandomSigner } = patract;

const { api, getAddresses, getSigners } = network;

describe("land", () => {
  after(() => {
    return api.disconnect();
  });

  async function setup() {
    await api.isReady
    const signerAddresses = await getAddresses();
    const Alice = signerAddresses[0];
    const sender = await getRandomSigner(Alice, "10000 UNIT");
    const contractFactory = await getContractFactory("land", sender.address);
    const contract = await contractFactory.deploy("new", "1000");
    const abi = artifacts.readArtifact("land");
    const receiver = await getRandomSigner();

    return { sender, contractFactory, contract, abi, receiver, Alice };
  }

  it("Assigns initial balance", async () => {
    const { contract, sender } = await setup();
    const result = await contract.query.balanceOf(sender.address);
    expect(result.output).to.equal(1000);
  });

});

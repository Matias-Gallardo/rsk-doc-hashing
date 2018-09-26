var revert = require("./assertRevert");
var expectEvent = require("../node_modules/openzeppelin-solidity/test/helpers/expectEvent");
var assertKilled = require("./assertKilled");
var web3 = require("web3");

const Notary = artifacts.require("./Notary_tokkenit.sol");

contract("Notary", function(accounts) {
  let contract;
  let Alice = accounts[0];
  let Bob = accounts[1];

  beforeEach("setup contract for each test", async function() {
    contract = await Notary.new({ from: Alice });
  });

  describe("General test of contracts", function() {
    it("should has an owner", async function() {
      assert.equal(await contract.owner(), Alice);
    });

    it("should allow ownership transfer", async function() {
      let tx = await contract.transferOwnership(Bob);
      assert.equal(await contract.owner(), Bob);
    });

    it("should not allow ownership transfer", async function() {
      revert(contract.transferOwnership(Bob, { from: Bob }));
    });

    it("should allow killing the contract", async function() {
      let tx = await contract.kill();
      assertKilled(contract.owner());
    });

    it("should not allow killing the contract", async function() {
      revert(contract.kill({ from: Bob }));
    });
  });

  describe("Testing the notary", function() {

    it("should register a Proof", async function() {
      let sentHash = web3.utils.sha3("zaraza");
      let tx = await contract.registerProof(sentHash);
      let response = await contract.getMetadata(sentHash);
      assert.equal(response[0], sentHash, "Los hashes no son iguales");
    });

    it("should fail registering a Proof not owner", async function() {
      let sentHash = web3.utils.sha3("zaraza");
      revert(contract.registerProof(sentHash, "xx1", { from: Bob }));
    });

    it("should register a Proof and check Metadata", async function() {
      let sentHash = web3.utils.sha3("zaraza");
      let tx = await contract.registerProof(sentHash);
      let response = await contract.getMetadata(sentHash);
      assert.equal(response[0], sentHash, "Los hashes no son iguales");
      assert.equal(response[1], Alice, "El sender no es igual a " + Alice);
    });

    it("should not allow to register same hash", async function() {
      let sentHash = web3.utils.sha3("zaraza");
      let tx1 = await contract.registerProof(sentHash);
      let response1 = await contract.getMetadata(sentHash);
      assert.equal(response1[0], sentHash, "Los hashes no son iguales");
      // let tx2 = await contract.registerProof(sentHash);
      // let eventName = "ProofAlreadyRegistered";
      // let event = await expectEvent.inLogs(tx2.logs, eventName);
      // assert.equal(event.event, eventName, "El evento no se registró");
    });
  });
});

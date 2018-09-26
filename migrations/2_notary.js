var Mortal = artifacts.require("./Mortal.sol");
var Owned = artifacts.require("./Owned.sol");
var Notary = artifacts.require("./Notary_tokkenit.sol");

module.exports = function(deployer) {
    deployer.deploy(Owned, {
        gasPrice: 183000000,
    });
    deployer.link(Owned, Mortal, {
        gasPrice: 183000000,
    });
    deployer.deploy(Mortal, {
        gasPrice: 183000000,
    });
    deployer.link(Owned, Mortal, Notary, {
        gasPrice: 183000000,
    });
    deployer.deploy(Notary, {
        gasPrice: 183000000,
    });
};

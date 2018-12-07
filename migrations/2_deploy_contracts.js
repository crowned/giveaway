const Giveaway = artifacts.require("./Giveaway.sol");

module.exports = function(deployer) {
  deployer.deploy(Giveaway);
};

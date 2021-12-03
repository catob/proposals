const Proposals = artifacts.require('./Proposals.sol');

module.exports = function (deployer) {
  deployer.deploy(Proposals);
}

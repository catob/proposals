const Proposals = artifacts.require('./Proposals.sol');

contract('Proposals', accounts => {
  it('initializes one proposal', () => {
    return Proposals.deployed().then(instance => {
      return instance.proposalCount();
    }).then(count => {
      assert.equal(count, 1);
    });
  });

  it('initializes the proposals with the correct values', () => {
    return Proposals.deployed().then(instance => {
      return instance.proposals(1);
    }).then(proposal => {
      assert.equal(proposal[0], 1, 'has the correct id');
      assert.equal(proposal[1], 0, 'has the correct yes votes');
      assert.equal(proposal[2], 0, 'has the correct no votes');
      assert.equal(proposal[3], 'First proposal', 'has the correct title');
      assert.equal(proposal[4], 'This is a proposal', 'has the correct content');
    });
  });
});

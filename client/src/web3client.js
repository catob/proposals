import Web3 from 'web3';
import ProposalsContractBuild from 'contracts/Proposals.json';

let selectedAccount;
let proposalsContract;
let isInitialize = false;

export const init = async () => {
  let provider = window.ethereum;

  if (typeof provider !== 'undefined') {
    provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }

  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  proposalsContract = new web3.eth.Contract(
    ProposalsContractBuild.abi,
    ProposalsContractBuild.networks[networkId].address,
  );

  isInitialize = true;
  const proposals = await getProposals();

  return {
    isInitialize,
    account: selectedAccount,
    proposals,
  }
};

const proposalCount = () => proposalsContract.methods.proposalCount().call();

const getProposals = async () => {
  const count = await proposalCount();
  let arr = [];

  for (let i = 1; i <= count; i++) {
    let data = await proposalsContract.methods.proposals(i).call();
    arr.push(data);
  }
  return arr;
}

export const addProposal = (title, content) => {
  return proposalsContract.methods.addProposal(title, content).send({ from: selectedAccount });
};

export const vote = (id, vote) => {
  return proposalsContract.methods.voteOnProposal(id, vote).send({ from: selectedAccount });
};

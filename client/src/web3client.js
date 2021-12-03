import Web3 from 'web3';
import ProposalsContractBuild from 'contracts/Proposals.json';

let selectedAccount;
let proposalsContract;

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
};

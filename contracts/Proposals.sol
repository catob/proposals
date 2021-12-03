pragma solidity 0.8.9;

contract Proposals {
    struct Proposal {
        uint id;
        string title;
        string content;
    }

    uint public proposalCount;

    mapping(uint => Proposal) public proposals;

    constructor () {
        addProposal("First proposal", "This is a proposal");
        addProposal("Second proposal", "This is another proposal");
    }

    function addProposal(string memory _title, string memory _content) public {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _title, _content);
    }

}

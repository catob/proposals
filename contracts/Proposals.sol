pragma solidity 0.8.10;

contract Proposals {
    struct Proposal {
        uint id;
        // uint yesVotes;
        // uint noVotes;
        string title;
        string content;
    }

    uint public proposalCount;

    mapping(uint => Proposal) public proposals;

    constructor () {
        addProposal("First proposal", "This is a proposal");
    }

    function addProposal(string memory _title, string memory _content) private {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _title, _content);
    }

}

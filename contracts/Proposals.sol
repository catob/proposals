pragma solidity 0.8.9;

contract Proposals {
    struct Proposal {
        uint id;
        uint yesVote;
        uint noVote;
        string title;
        string content;
    }

    uint public proposalCount;

    mapping(uint => Proposal) public proposals;

    event proposalCreatedEvent(address indexed from, uint indexed proposalId);

    constructor () {
        addProposal("First proposal", "This is a proposal");
    }

    function addProposal(string memory _title, string memory _content) public {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, 0, 0, _title, _content);
        emit proposalCreatedEvent(msg.sender, proposalCount);
    }

    function voteOnProposal(uint _proposalId, bool vote) public {
        Proposal storage proposal = proposals[_proposalId];
        if (vote) {
          proposal.yesVote++;
        } else {
            proposal.noVote++;
        }
    }

}

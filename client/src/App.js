import './App.css';
import React, { useEffect, useState } from 'react';
import { init, getProposals, addProposal, vote } from './web3client';

function App() {
  const [isInitialized, setInitialized] = useState(false);
  const [account, setAccount] = useState('');
  const [proposals, setProposals] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    init().then(res => {
      setInitialized(res.isInitialize);
      setAccount(res.account);
      setProposals(res.proposals);
    });
  }, []);

  const handleAddProposal = e => {
    e.preventDefault();
    addProposal(formData.title, formData.content).then(_ => {
      getProposals().then(allProposals => {
        setProposals(allProposals);
      });
    });
  };

  const handleVote = (e, id, option) => {
    e.preventDefault();
    vote(id, option).then(_ => {
      getProposals().then(allProposals => {
        setProposals(allProposals);
      });
    });
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      {!isInitialized
        ? <p>Loading...</p>
        : (
          <>
            <p>Connected to account: {account}</p>
            <div>
              <h3>Current Proposals:</h3>
              {proposals.map(proposal => (
                <div key={proposal.id}>
                  <p>Title: {proposal.title}</p>
                  <p>Content: {proposal.content}</p>
                  <p>
                    <span>For: {proposal.yesVote} | </span>
                    <span>Against: {proposal.noVote}</span>
                  </p>
                  <button onClick={e => handleVote(e, proposal.id, true)}>Vote yes</button>
                  <button onClick={e => handleVote(e, proposal.id, false)}>Vote no</button>
                  <hr style={{width: '1000px'}}></hr>
                </div>
              ))}
              <h3>Create proposal:</h3>
              <form onSubmit={handleAddProposal}>
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="content"
                  placeholder="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                />
                <input type="submit" />
              </form>
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;

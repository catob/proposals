import './App.css';
import React, { useEffect, useState } from 'react';
import { init, addProposal } from './web3client';

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
      console.log(res);
    });
  }, []);

  const handleAddProposal = e => {
    e.preventDefault();
    addProposal(formData.title, formData.content).then(tx => {
      const newProposal = {
        title: formData.title,
        content: formData.content
      };
      console.log(tx);
      setFormData({});
      setProposals([...proposals, newProposal]);
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

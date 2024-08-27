import React, { useState } from 'react';
import Votetemplate from './Votetemplate'; // Adjust path if necessary
import axios from 'axios';
import './App.css';

function App() {
  const [selectedCandidates, setSelectedCandidates] = useState({
    "President": null,
    "Vice President": null,
    "Treasurer": null,
    "Vice Associate": null
  });
  const [voterId, setVoterId] = useState('');
  const [error, setError] = useState(''); // For storing error messages
  const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility

  const handleSelect = (title, candidate) => {
    setSelectedCandidates(prevState => ({
      ...prevState,
      [title]: candidate.name // Store only the name
    }));
  };

  const handleVote = async () => {
    try {
      // Check if the voter ID has already voted
      const checkResponse = await axios.get(`https://voting-backend-pe3b.onrender.com/api/vote/${voterId}`);
      if (checkResponse.data.hasVoted) {
        alert('You have already voted!');
        return;
      }

      // Submit the vote if not already voted
      const response = await axios.post('https://voting-backend-pe3b.onrender.com/api/vote', {
        voterId,
        votes: selectedCandidates
      });
      console.log(response.data);
      console.log('Vote submitted successfully!');

      // Show overlay and hide it after 10 seconds
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        window.location.reload();
      }, 5000); // 10 seconds

      
      
      

    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Error submitting vote. Please try again.');
    }
  };

  return (
    <div>
      <div className='ace'>
        <img src='./imgs/EEC.png' className='eec'></img>
        <h1 className='kratos'> <span className='rr'>ACE&nbsp;</span> Voting</h1>
      </div>
      <div className='year'>
        <label>Year : </label>
        <select id="year">
          <option value="2nd">II Year</option>
          <option value="3rd">III Year</option>
          <option value="4th">IV Year</option>
        </select>
      </div>
      <div className='roll'>
        <input
          type="text"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          placeholder="Enter your Roll no."
        />
      </div>
      <div className='titletemp'>
        <Votetemplate title="President" onSelect={handleSelect} />
        <Votetemplate title="Vice President" onSelect={handleSelect} />
        <Votetemplate title="Secretary" onSelect={handleSelect} />
        <Votetemplate title="Joint Secretary" onSelect={handleSelect} />
      </div>
      <div className='vv'>
        <button onClick={handleVote}>Vote</button>
      </div>
      <div className='foot'>
        done by - Antony , Ajmal.
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className='overlay'>
          <div className='overlay-content'>
            <h1>Thank you for voting!</h1>
            <p>Your vote has been recorded successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

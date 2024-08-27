import React from 'react';
import Cards from './Cards'; // Adjust path if necessary
import candidateData from './candidateData.json'; // Import the JSON data

const Votetemplate = ({ title, onSelect }) => {
  const candidates = candidateData[title.toLowerCase()] || []; // Default to an empty array if title doesn't match

  return (
    <div className="template">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <hr /> {/* Horizontal line */}
      <div className='votepanel'>
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <Cards
              key={index}
              id={`${title}-${index}`} // Unique ID for each card
              name={candidate.name}
              image={candidate.image}
              onSelect={onSelect}
              title={title}
            />
          ))
        ) : (
          <p>No candidates available for this position.</p>
        )}
      </div>
    </div>
  );
}

export default Votetemplate;

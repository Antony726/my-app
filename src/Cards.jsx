import React from 'react';

const Cards = ({ id, name, image, onSelect, title }) => {
  const handleChange = () => {
    onSelect(title, { name });
  };

  return (
    <div className="cardcont">
      <input
        type="radio"
        id={id}
        name={title} // Same name for all candidates in the same title
        onChange={handleChange}
      />
      <label htmlFor={id} className="cards">
        <img src={image} alt={name} />
        <div className="name">{name}</div>
      </label>
    </div>
  );
}

export default Cards;

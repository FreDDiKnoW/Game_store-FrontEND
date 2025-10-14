import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

function GameCard({ game }) {
  const imageUrl = game.image
    ? `http://127.0.0.1:8000${game.image}`
    : 'https://via.placeholder.com/300x400';

  return (
    <Link to={`/games/${game.id}`} className="game-card-link">
      <div className="game-card">

        <div className="game-card-image-container">
          <img src={imageUrl} alt={game.title} className="game-card-image" />
        </div>

        <div className="game-card-footer">
          <h3 className="game-card-title">{game.title}</h3>
          <div className="game-card-price">${game.price}</div>
        </div>

      </div>
    </Link>
  );
}

export default GameCard;
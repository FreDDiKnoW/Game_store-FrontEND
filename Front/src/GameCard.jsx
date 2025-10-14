import React from 'react';
import './GameCard.css';

function GameCard({ game }) {
  const imageUrl = game.image
    ? `http://127.0.0.1:8000${game.image}`
    : 'https://via.placeholder.com/300x400';

  return (
    <div className="game-card">
      <img src={imageUrl} alt={game.title} className="game-card-image" />

      <div className="game-card-overlay">
        <p className="overlay-description">{game.shortDescription}</p>
        <div className="overlay-details">
          <span><strong>Developer:</strong> {game.developer.name}</span>
          <span>
            <strong>Genre:</strong> {game.genres.map(genre => genre.name).join(', ')}
          </span>
        </div>
      </div>

      <div className="game-card-info">
        <h3 className="game-card-title">{game.title}</h3>
        <span className="game-card-price">${game.price}</span>
      </div>
    </div>
  );
}

export default GameCard;
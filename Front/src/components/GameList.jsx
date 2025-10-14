import React from 'react';
import GameCard from './GameCard';
import './GameList.css';

function GameList({ games }) {
  if (games.length === 0) {
    return <p style={{textAlign: 'center'}}>Ігор за вашим запитом не знайдено.</p>
  }
  return (
    <div className="game-list">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
export default GameList;
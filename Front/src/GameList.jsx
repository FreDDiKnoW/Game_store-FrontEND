import React, { useState, useEffect } from 'react';
import GameCard from './GameCard.jsx';
import './GameList.css';

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/games/')
        if (!response.ok) {
          throw new Error('Не вдалося завантажити дані');
        }
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); //

  if (loading) {
    return <p>Завантаження ігор...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
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
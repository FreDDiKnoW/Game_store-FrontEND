import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GameDetail.css';

function GameDetailPage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/games/${gameId}/`);
        if (!response.ok) throw new Error('Гра не знайдена');
        const data = await response.json();
        setGame(data);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchGame();
  }, [gameId]);

  if (loading) return <p className="page-message">Download...</p>;
  if (error) return <p className="page-message">Error: {error}</p>;
  if (!game) return <p className="page-message">This game does not exist :/</p>;

  const imageUrl = game.image ? `http://127.0.0.1:8000${game.image}` : '';

  return (
    <div className="detail-page-container">
      <Link to="/" className="back-link">&larr; Back to catalog</Link>

      <h1 className="game-main-title">{game.title}</h1>

      <div className="detail-layout">
        <div className="left-column">
          {imageUrl && <img src={imageUrl} alt={game.title} className="game-cover-image" />}
          <div className="game-price">${game.price}</div>
        </div>

        <div className="right-column">
          <h2>Про гру</h2>
          <p className="game-description">{game.fullDescription}</p>

          <hr className="divider" />

          <div className="game-specs">
            <div><strong>Developer:</strong> {game.developer.name}</div>
            <div><strong>Genre:</strong> {game.genres.map(g => g.name).join(', ')}</div>
            <div><strong>Released at:</strong> {game.releaseDate}</div>
            <div><strong>Ratingг:</strong> {game.rating} / 5.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailPage;
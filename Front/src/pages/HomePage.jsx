import React, { useState, useEffect, useMemo } from 'react';
import GameList from '../components/GameList';
import './HomePage.css';

function HomePage() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [gamesRes, genresRes, developersRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/v1/games/'),
          fetch('http://127.0.0.1:8000/api/v1/genres/'),
          fetch('http://127.0.0.1:8000/api/v1/developers/'),
        ]);

        const gamesData = await gamesRes.json();
        const genresData = await genresRes.json();
        const developersData = await developersRes.json();

        setGames(gamesData);
        setGenres(genresData);
        setDevelopers(developersData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const filteredAndSortedGames = useMemo(() => {
    let result = [...games];

    if (searchTerm) {
      result = result.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      result = result.filter(game =>
        game.genres.some(g => g.id === parseInt(selectedGenre))
      );
    }

    if (selectedDeveloper) {
      result = result.filter(game => game.developer.id === parseInt(selectedDeveloper));
    }

    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [games, selectedGenre, selectedDeveloper, sortOrder, searchTerm]);

  if (loading) {
    return <p>Download...</p>;
  }

  return (
    <div className="homepage">
      <div className="controls-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
          <option value="">Genres</option>
          {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
        </select>
        <select value={selectedDeveloper} onChange={e => setSelectedDeveloper(e.target.value)}>
          <option value="">Developers</option>
          {developers.map(dev => <option key={dev.id} value={dev.id}>{dev.name}</option>)}
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="name-asc">Name (А-Z)</option>
          <option value="name-desc">namE (Z-A)</option>
          <option value="price-asc">Cost (most cheap)</option>
          <option value="price-desc">Cost (most expensive)</option>
        </select>
      </div>
      <GameList games={filteredAndSortedGames} />
    </div>
  );
}

export default HomePage;
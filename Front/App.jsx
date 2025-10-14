// src/App.jsx
import React from 'react';
import GameList from './src/GameList.jsx';

function App() {
  return (
    <div>
      <header style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Welcome to GameStore!</h1>
        <p>Best games ever for best people!</p>
      </header>
      <main>
        <GameList />
      </main>
    </div>
  );
}

export default App;
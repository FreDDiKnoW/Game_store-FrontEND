import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './src/components/Header.jsx';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Header user={user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
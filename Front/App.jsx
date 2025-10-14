import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import Header from './src/components/Header.jsx';

function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </AuthProvider>
  );
}

export default App;
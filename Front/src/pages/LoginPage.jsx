import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Modal from '../Modal/Modal';
import './Form.css';

const LoginPage = () => {
  const { loginUser, user } = useContext(AuthContext);
   if (user) {
    return <Navigate to="/" />;
  }
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = await loginUser(e);
    if (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <>
      <Modal message={error} onClose={() => setError(null)} />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          <input className="form-input" type="text" name="username" placeholder="Enter your Login" required />
          <input className="form-input" type="password" name="password" placeholder="Enter you password" required />
          <button type="submit" className="form-button">GO</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
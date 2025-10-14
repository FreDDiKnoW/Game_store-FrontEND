import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './Form.css';

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    if (password !== password2) {
      setError("Passwords are not same!");
      return;
    }

    const response = await fetch('http://127.0.0.1:8000/api/v1/users/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, password2 })
    });

    if (response.status === 201) {
      navigate('/login');
    } else {
      const data = await response.json();
      const errorMessage = Object.values(data).flat().join(' ');
      setError(errorMessage || 'Error!');
    }
  };

  return (
    <>
      <Modal message={error} onClose={() => setError(null)} />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Registration</h2>
          <input className="form-input" type="text" name="username" placeholder="Login" required />
          <input className="form-input" type="password" name="password" placeholder="Password" required />
          <input className="form-input" type="password" name="password2" placeholder="Repeat password" required />
          <button type="submit" className="form-button">Register</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
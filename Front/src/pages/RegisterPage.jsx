import React,{ useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import AuthContext from '../context/AuthContext';
import './Form.css';

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.password2) {
      setError("Passwords must match!");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        const errorMessages = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value.join(' ')}`)
          .join('\n');
        setError(errorMessages || 'Error!');
      }
    } catch (err) {
      setError('Cannot connect to server(');
    }
  };

  return (
    <>
      <Modal message={error} onClose={() => setError(null)} />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>New account</h2>

          <input className="form-input" type="text" name="username" placeholder="Nickname (obligatory)" required />
          <input className="form-input" type="email" name="email" placeholder="Email (obligatory)" required />
          <input className="form-input" type="text" name="first_name" placeholder="First name (obligatory)" />
          <input className="form-input" type="text" name="last_name" placeholder="Last name (obligatory)" />
          <input className="form-input" type="password" name="password" placeholder="Password (obligatory)" required />
          <input className="form-input" type="password" name="password2" placeholder="Repeat password (obligatory)" required />

          <button type="submit" className="form-button">Register me!</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
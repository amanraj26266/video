import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();

    // Implement login logic here
    // - Send login request to your backend API with username and password
    // - Validate credentials and handle errors
    // - Upon successful login, store necessary user information (e.g., token)
    //   in local storage or state management solution
    // - Redirect to the lobby after successful login

    // Example placeholder logic (replace with your actual API call and validation)
    if (username === 'user1' && password === 'password123') {
      localStorage.setItem('isLoggedIn', true);
      navigate('/lobby');
    } else {
      alert('Invalid username or password');
    }
  }, [username, password, navigate]);

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginScreen;

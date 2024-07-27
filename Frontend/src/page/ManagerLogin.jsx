import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const ManagerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const userData = { username, password };

    axios
      .post('http://127.0.0.1:5000/login/mngr', userData) // Adjusted endpoint for manager login
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('UserType', 'manager'); // Set UserType as manager
          window.location.href = '/'; // Redirect to home page
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.'); // Notify user of error
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage:
            'linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))',
        }}
      >
        <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
          <h2 className="mb-3 text-primary">Manager Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputUsername1" className="form-label">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="form-control"
                id="exampleInputUsername1"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {loading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <p className="container my-2">Don't have an account?</p>
          <Link to="/ManagerRegister" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const [error, setError] = useState('');


  // handleSubmit function used to handle the post request from client to server to login the user.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('https://reeloserver.up.railway.app/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); 
        setUser(response.data); 
        history('/'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const [error, setError] = useState('');


  // handle submit function to handle the request for signup of the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reeloserver.up.railway.app/api/auth/signup', {
        email,
        password,
      });
      console.log(response); 
      if (response.status === 201) {
        history('/login');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Signup</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default Register;

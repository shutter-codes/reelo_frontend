// src/components/Navbar.js
import React from 'react';
import { Link ,useNavigate } from 'react-router-dom';

function Navbar({ user, setUser ,handleLogout }) {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/login'); // Redirect after logout
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Reelo Music</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.email}</span>
              {user && <button onClick={logout}>Logout</button>}

            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded">SignUp</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
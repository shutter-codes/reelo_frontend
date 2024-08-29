import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import AllSongs from './components/songs/AllSongs';
import PlaylistDetails from './components/playlist/PlaylistDetails';
import PlayerContainer from './components/playerex/PlayerContainer'; // Import the new component

function App() {
  const [user, setUser] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: localStorage.getItem('email'), token });

      // Load last played song and its time
      const lastPlayedSong = JSON.parse(localStorage.getItem('lastPlayedSong'));
      if (lastPlayedSong) {
        setCurrentSong(lastPlayedSong.song);
        setCurrentTime(lastPlayedSong.time);

        // Find the index of the last played song in the playlist
        const playlistFromStorage = JSON.parse(localStorage.getItem('playlist')) || [];
        const songIndex = playlistFromStorage.findIndex(s => s._id === lastPlayedSong.song._id);
        if (songIndex !== -1) {
          setPlaylist(playlistFromStorage);
          setCurrentSongIndex(songIndex);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (playerRef.current && currentSong) {
      playerRef.current.currentTime = currentTime;
    }
  }, [currentSong, currentTime]);

  const handleSetCurrentSong = (song, newPlaylist) => {
    setCurrentSong(song);
    if (newPlaylist) {
      setPlaylist(newPlaylist);
      setCurrentSongIndex(newPlaylist.findIndex(s => s._id === song._id));
      localStorage.setItem('playlist', JSON.stringify(newPlaylist)); // Save playlist to localStorage
    }
    // Save current song to localStorage
    localStorage.setItem('lastPlayedSong', JSON.stringify({ song, time: 0 }));
  };
  
  const handleSongChange = (direction) => {
    const playlistLength = playlist.length;
    const newIndex = (currentSongIndex + direction + playlistLength) % playlistLength;
    setCurrentSongIndex(newIndex);
    setCurrentSong(playlist[newIndex]);
    setCurrentTime(0); // Reset time for new song
    // Save new song to localStorage
    localStorage.setItem('lastPlayedSong', JSON.stringify({ song: playlist[newIndex], time: 0 }));
  };
  
  const handleLogout = () => {
    if (playerRef.current) {
      playerRef.current.pause(); // Pause the player if it's playing
      // Save the current song and playback time before logging out
      const currentTime = playerRef.current.currentTime;
      localStorage.setItem('lastPlayedSong', JSON.stringify({ song: currentSong, time: currentTime }));
    }

    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('playlist'); // Clear the playlist from localStorage

    // Reset state
    setUser(null);
    setCurrentSong(null);
    setPlaylist([]);
    setCurrentSongIndex(0);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
    if (currentSong) {
      localStorage.setItem('lastPlayedSong', JSON.stringify({ song: currentSong, time }));
    }
  };

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar user={user} setUser={setUser} handleLogout={handleLogout} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<PrivateRoute><Home setCurrentSong={handleSetCurrentSong} /></PrivateRoute>} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/songs" element={<PrivateRoute><AllSongs setCurrentSong={handleSetCurrentSong} /></PrivateRoute>} />
            <Route path="/playlist/:playlistId" element={<PrivateRoute><PlaylistDetails setCurrentSong={handleSetCurrentSong} /></PrivateRoute>} />
          </Routes>
        </main>
        <PlayerContainer
          currentSong={currentSong}
          playlist={playlist}
          onNext={() => handleSongChange(1)}
          onPrevious={() => handleSongChange(-1)}
          initialTime={currentTime}
          onTimeUpdate={handleTimeUpdate}
          playerRef={playerRef}
        />
      </div>
    </Router>
  );
}

export default App;

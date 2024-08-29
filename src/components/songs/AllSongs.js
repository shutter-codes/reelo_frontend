import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSongs, fetchPlaylists, addSongToPlaylist } from '../../services/api';
import FlashMessage from '../common/FlashMessage';
import SongItem from './SongItem';
import PlaylistPopup from '../playlist/PlaylistPopup';

function AllSongs({ setCurrentSong }) {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [songsData, playlistsData] = await Promise.all([fetchSongs(), fetchPlaylists()]);
        setSongs(songsData);
        setPlaylists(playlistsData);
      } catch (error) {
        setFlashMessage({ type: 'error', text: 'Failed to fetch data.' });
      }
    };
    loadData();
  }, []);

  const handlePlaySong = (song) => setCurrentSong(song);

  const handleAddToPlaylist = (song) => {
    setSelectedSong(song);
    setShowPlaylistPopup(true);
  };

  const handleSaveToPlaylists = async () => {
    try {
      for (const playlistId of selectedPlaylists) {
        await addSongToPlaylist(playlistId, selectedSong._id);
      }
      setFlashMessage({ type: 'success', text: 'Song added to playlists!' });
    } catch {
      setFlashMessage({ type: 'error', text: 'Failed to add song to playlists.' });
    } finally {
      setShowPlaylistPopup(false);
      setSelectedPlaylists([]);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">All Songs</h2>
      <FlashMessage message={flashMessage} />
      <ul className="flex flex-wrap gap-4">
        {songs.map((song) => (
          <SongItem
            key={song._id}
            song={song}
            onPlay={handlePlaySong}
            onAddToPlaylist={handleAddToPlaylist}
          />
        ))}
      </ul>
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Home
      </Link>
      {showPlaylistPopup && (
        <PlaylistPopup
          playlists={playlists}
          selectedPlaylists={selectedPlaylists}
          setSelectedPlaylists={setSelectedPlaylists}
          onSave={handleSaveToPlaylists}
          onClose={() => setShowPlaylistPopup(false)}
        />
      )}
    </div>
  );
}

export default AllSongs;

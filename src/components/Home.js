import React, { useState, useEffect, useCallback, Suspense, lazy, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSongs, fetchPlaylists, addSongToPlaylist, createPlaylist } from '../services/api';
import FlashMessage from './common/FlashMessage';
import { debounce } from 'lodash';

// Lazy load SongItem and PlaylistItem components
const SongItem = lazy(() => import('./songs/SongItem'));
const PlaylistItem = lazy(() => import('./playlist/PlaylistItem'));

function Home({ setCurrentSong }) {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [showCreatePlaylistPopup, setShowCreatePlaylistPopup] = useState(false);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch data from APIs
        const [songsData, playlistsData] = await Promise.all([fetchSongs(), fetchPlaylists()]);
        setSongs(songsData);
        setPlaylists(playlistsData);
      } catch (error) {
        setFlashMessage({ type: 'error', text: 'Failed to fetch data.' });
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const debouncedSetCurrentSong = useCallback(
    debounce((song) => {
      setCurrentSong(song);
    }, 100),
    [setCurrentSong]
  );

  const handlePlaySong = useCallback((song) => {
    if (selectedSong !== song) {
      setSelectedSong(song);
      debouncedSetCurrentSong(song);
    }
  }, [selectedSong, debouncedSetCurrentSong]);

  const handleShowAllSongs = useCallback(() => {
    navigate('/songs');
  }, [navigate]);

  const handleAddToPlaylist = useCallback((song) => {
    setSelectedSong(song);
    setShowPlaylistPopup(true);
  }, []);

  const handleCheckboxChange = useCallback((playlistId) => {
    setSelectedPlaylists((prev) =>
      prev.includes(playlistId) ? prev.filter((id) => id !== playlistId) : [...prev, playlistId]
    );
  }, []);

  const handleSaveToPlaylists = useCallback(async () => {
    if (selectedSong) {
      try {
        const addSongPromises = selectedPlaylists.map(playlistId =>
          addSongToPlaylist(playlistId, selectedSong._id)
        );
        await Promise.all(addSongPromises);
        setFlashMessage({ type: 'success', text: 'Song added to playlists!' });
      } catch {
        setFlashMessage({ type: 'error', text: 'Failed to add song to playlists.' });
      } finally {
        setShowPlaylistPopup(false);
        setSelectedSong(null);
        setSelectedPlaylists([]);
      }
    }
  }, [selectedPlaylists, selectedSong]);

  const handleCreatePlaylist = useCallback(async () => {
    if (newPlaylistName.trim()) {
      try {
        const newPlaylist = await createPlaylist(newPlaylistName);
        setPlaylists((prev) => [...prev, newPlaylist]);
        setNewPlaylistName('');
        setShowCreatePlaylistPopup(false);
        setFlashMessage({ type: 'success', text: 'Playlist created successfully!' });
      } catch (error) {
        setFlashMessage({ type: 'error', text: 'Failed to create playlist.' });
      }
    }
  }, [newPlaylistName]);

  const clearFlashMessage = () => setFlashMessage(null);

  // Memoized values to optimize rendering
  const displayedSongs = useMemo(() => songs.slice(0, displayCount), [songs, displayCount]);
  const displayedPlaylists = useMemo(() => playlists, [playlists]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FlashMessage message={flashMessage} onRemove={clearFlashMessage} />

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h2 className="text-xl font-bold mb-2">Songs</h2>
          <ul className="flex flex-wrap gap-4">
            {displayedSongs.map((song) => (
              <SongItem key={song._id} song={song} onPlay={handlePlaySong} onAddToPlaylist={handleAddToPlaylist} />
            ))}
          </ul>
          {songs.length > displayCount && (
            <button onClick={handleShowAllSongs} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Show All
            </button>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          <ul className="space-y-2">
            {displayedPlaylists.map((playlist) => (
              <PlaylistItem key={playlist._id} playlist={playlist} />
            ))}
          </ul>
          <button onClick={() => setShowCreatePlaylistPopup(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Create Playlist
          </button>
        </div>
      </Suspense>

      {showPlaylistPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Select Playlist(s)</h3>
            <ul className="space-y-2">
              {playlists.map((playlist) => (
                <li key={playlist._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPlaylists.includes(playlist._id)}
                    onChange={() => handleCheckboxChange(playlist._id)}
                    className="mr-2"
                  />
                  {playlist.name}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex space-x-4">
              <button onClick={handleSaveToPlaylists} className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setShowPlaylistPopup(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreatePlaylistPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
              className="border p-2 rounded w-full mb-4"
            />
            <div className="mt-4 flex space-x-4">
              <button onClick={handleCreatePlaylist} className="bg-green-500 text-white px-4 py-2 rounded">
                Create
              </button>
              <button onClick={() => setShowCreatePlaylistPopup(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

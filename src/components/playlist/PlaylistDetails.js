import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSongsForPlaylist, removeSongFromPlaylist } from '../../services/api';
import FlashMessage from '../common/FlashMessage';
import SongItem from '../songs/SongItem';

function PlaylistDetails({ setCurrentSong }) {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);
      try {
        const songsData = await fetchSongsForPlaylist(playlistId);
        setSongs(songsData);
        if (songsData.length === 0) {
          setFlashMessage({ type: 'info', text: 'No songs in this playlist.' });
        }
      } catch {
        setFlashMessage({ type: 'error', text: 'Failed to fetch playlist details.' });
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, [playlistId]);

  const handlePlaySong = (song) => setCurrentSong(song);

  const handleRemoveFromPlaylist = async (songId) => {
    try {
      await removeSongFromPlaylist(playlistId, songId);
      setSongs(songs.filter((song) => song._id !== songId));
      setFlashMessage({ type: 'success', text: 'Song removed from playlist.' });
    } catch {
      setFlashMessage({ type: 'error', text: 'Failed to remove song from playlist.' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Playlist </h2>
      {loading ? (
        <h1 className="text-gray-500 text-center">Hold on we are loading the songs</h1>
      ) : (
        songs.length === 0 ? (
            <FlashMessage message={flashMessage} />
        ) : (
          <ul className="space-y-2">
            {songs.map((song) => (
              <SongItem key={song._id} song={song} onPlay={handlePlaySong} onRemoveFromPlaylist={() => handleRemoveFromPlaylist(song._id)} />
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default PlaylistDetails;

// services/api.js
export const fetchSongs = async () => {
  const response = await fetch('https://reeloserver.up.railway.app/api/songs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch songs');
  return response.json();
};

export const fetchPlaylists = async () => {
  const response = await fetch('https://reeloserver.up.railway.app/api/playlists', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch playlists');
  return response.json();
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const response = await fetch('https://reeloserver.up.railway.app/api/playlists/add-song', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ playlistId, songId })
  });
  if (!response.ok) throw new Error('Failed to add song to playlist');
  return response.json();
};

export const removeSongFromPlaylist = async (playlistId, songId) => {
  const response = await fetch(`https://reeloserver.up.railway.app/api/playlists/${playlistId}/remove-song`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ songId })
  });
  if (!response.ok) throw new Error('Failed to remove song from playlist');
  return response.json();
};


export const createPlaylist = async (name) => {
  const response = await fetch('https://reeloserver.up.railway.app/api/playlists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ name })
  });

  if (!response.ok) throw new Error('Failed to create playlist');
  return response.json();
};


export const fetchSongsForPlaylist = async (playlistId) => {
  console.log(playlistId);

  const response = await fetch(`https://reeloserver.up.railway.app/api/playlists/${playlistId}/songs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch songs for playlist');
  return response.json();
};
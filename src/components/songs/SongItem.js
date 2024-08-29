import React from 'react';

function SongItem({ song, onPlay, onAddToPlaylist, onRemoveFromPlaylist }) {
  return (
    <li className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{song.title}</h3>
      <p>{song.artist}</p>
      <div className="flex space-x-2 mt-2">
        <button onClick={() => onPlay(song)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Play
        </button>
        {onAddToPlaylist && (
          <button onClick={() => onAddToPlaylist(song)} className="bg-green-500 text-white px-4 py-2 rounded">
            Add to Playlist
          </button>
        )}
        {onRemoveFromPlaylist && (
          <button onClick={onRemoveFromPlaylist} className="bg-red-500 text-white px-4 py-2 rounded">
            Remove
          </button>
        )}
      </div>
    </li>
  );
}

export default SongItem;

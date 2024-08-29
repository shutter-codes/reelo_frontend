    // components/PlaylistItem.js
import React from 'react';
import { Link } from 'react-router-dom';

function PlaylistItem({ playlist }) {
  return (
    <li key={playlist._id} className="bg-white p-4 rounded shadow">
      <Link to={`/playlist/${playlist._id}`} className="font-bold text-blue-500">
        {playlist.name}
      </Link>
    </li>
  );
}

export default PlaylistItem;

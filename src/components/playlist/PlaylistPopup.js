import React from 'react';

function PlaylistPopup({ playlists, selectedPlaylists, setSelectedPlaylists, onSave, onClose }) {
  const handleCheckboxChange = (playlistId) => {
    setSelectedPlaylists((prevSelected) =>
      prevSelected.includes(playlistId)
        ? prevSelected.filter(id => id !== playlistId)
        : [...prevSelected, playlistId]
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Add to Playlist</h3>
        <ul className="mb-4">
          {playlists.map((playlist) => (
            <li key={playlist._id} className="mb-2">
              <label>
                <input
                  type="checkbox"
                  checked={selectedPlaylists.includes(playlist._id)}
                  onChange={() => handleCheckboxChange(playlist._id)}
                />
                {playlist.name}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={onSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaylistPopup;

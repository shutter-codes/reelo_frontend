import React from 'react';
import { useLocation } from 'react-router-dom';
import Player from './Player';

const PlayerContainer = ({ currentSong, playlist, onNext, onPrevious, initialTime, onTimeUpdate, playerRef }) => {
  const location = useLocation();
  const showPlayer = currentSong && location.pathname !== '/login';

  return showPlayer ? (
    <Player
      ref={playerRef}
      song={currentSong}
      playlist={playlist}
      onNext={onNext}
      onPrevious={onPrevious}
      initialTime={initialTime}
      onTimeUpdate={onTimeUpdate}
    />
  ) : null;
};

export default PlayerContainer;

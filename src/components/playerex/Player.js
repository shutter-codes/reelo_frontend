import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

function Player({ song, playlist, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, song]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold">{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={onPrevious} className="text-2xl">
              <FaStepBackward />
            </button>
            <button onClick={togglePlay} className="text-3xl">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={onNext} className="text-2xl">
              <FaStepForward />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full"
          />
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-xl">
            {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
      />
    </div>
  );
}

export default Player;
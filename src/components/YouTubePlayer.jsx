import React from 'react';
import YouTube from 'react-youtube';
import './YouTubePlayer.css';

function YouTubePlayer({ videoId, isPlaying }) {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1, // Autoplay el video cuando esté listo
    },
  };

  const onReady = (event) => {
    // El reproductor está listo
    if (isPlaying) {
      event.target.playVideo();
    } else {
      event.target.pauseVideo();
    }
  };

  const onStateChange = (event) => {
    // Puedes manejar cambios de estado aquí si es necesario
    // Por ejemplo, si el video termina
  };

  if (!isPlaying) {
    return null; // No renderizar nada si no debe estar sonando
  }

  return (
    <div className="youtube-player-container">
      <YouTube videoId={videoId} opts={opts} onReady={onReady} onStateChange={onStateChange} />
    </div>
  );
}

export default YouTubePlayer;
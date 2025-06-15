import { useState, useEffect } from 'react'; // Agrega useEffect
import './App.css';
import MemoryGame from './components/MemoryGame';
import Timer from './components/Timer';
import LockedPhoto from './components/LockedPhoto';
import Confetti from './components/Confetti';
import YouTubePlayer from './components/YouTubePlayer'; // Importa YouTubePlayer

const INITIAL_TIME = 60; // 60 segundos para el juego
const YOUTUBE_VIDEO_ID_PLACEHOLDER = 'dQw4w9WgXcQ'; // Placeholder (Rick Astley - Never Gonna Give You Up)
const WIN_SOUND_PATH = '/sounds/win.mp3'; // Ruta al sonido de victoria

function App() {
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameWin = () => {
    console.log('¡Juego ganado desde App!');
    setGameWon(true);
    setGameStarted(false);
    const winSound = new Audio(WIN_SOUND_PATH);
    winSound.play();
  };

  const handleTimeUp = () => {
    console.log('¡Tiempo agotado!');
    if (!gameWon) {
      setGameLost(true);
      setGameStarted(false);
    }
  };

  const startGame = () => {
    setGameWon(false);
    setGameLost(false);
    setGameStarted(true);
    // Podrías querer resetear el estado interno de MemoryGame aquí si es necesario
    // o pasar una key que cambie para forzar el remontaje.
  };

  return (
    <>
      <h1>Memorama del Día del Padre</h1>
      <Confetti isActive={gameWon} />

      {gameWon && (
        <div className="congratulations-message">
          <h2>¡Feliz Día, Papá! ❤️</h2>
          <LockedPhoto isUnlocked={gameWon} />
          <YouTubePlayer videoId={YOUTUBE_VIDEO_ID_PLACEHOLDER} isPlaying={gameWon} />
        </div>
      )}

      {gameLost && (
        <div className="status-message">
          <h2>¡Oh no! Se acabó el tiempo.</h2>
          <button onClick={startGame} className="play-again-button">Jugar de Nuevo</button>
        </div>
      )}

      {!gameStarted && !gameWon && !gameLost && (
        <button onClick={startGame} className="start-game-button">Comenzar Juego</button>
      )}

      {gameStarted && !gameWon && !gameLost && (
        <>
          <Timer 
            initialTime={INITIAL_TIME} 
            onTimeUp={handleTimeUp} 
            gameStarted={gameStarted} 
          />
          <MemoryGame 
            onGameWin={handleGameWin} 
            gameStarted={gameStarted} 
            onGameStart={startGame} // Para el botón de "Nuevo Juego" dentro de MemoryGame
          />
        </>
      )}
    </>
  );
}

export default App;

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
const LOSE_SOUND_PATH = '/sounds/lose.mp3'; // Ruta al sonido de derrota

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
      const loseSound = new Audio(LOSE_SOUND_PATH);
      loseSound.play();
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
          <h2>¡Feliz Día Papá, te amo!</h2>
          <LockedPhoto isUnlocked={gameWon} />
          <p className='sub-message'>Muchas gracias por todo, estamos orgullosos de ser tu familia :) -ATTE Javi, Dani y tu esposa Doris</p>
          <YouTubePlayer videoId={YOUTUBE_VIDEO_ID_PLACEHOLDER} isPlaying={gameWon} />
        </div>
      )}

      {gameLost && (
        <div className="status-message">
          <h2>Echale ganas</h2>
          <img className='gif' src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bmsxdWgxZHBqeHNsMWZucjAxMHc3NHBuamg5eGN5dWFrdXd3MTBzdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xTg8B1l93LXgcQgcta/giphy.gif" alt="Descripción del GIF"/>
          <p></p>
          <button onClick={startGame} className="play-again-button">Jugar de Nuevo</button>
        </div>
      )}

      {!gameStarted && !gameWon && !gameLost && (
        <div className="initial-state-container">
          <p className="unlock-instructions">Completa el memorama para revelar la foto</p>
          <LockedPhoto isUnlocked={false} />
          <button onClick={startGame} className="start-game-button">Comenzar Juego</button>
        </div>
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

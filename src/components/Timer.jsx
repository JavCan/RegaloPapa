import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer({ initialTime, onTimeUp, gameStarted }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Reiniciar el temporizador si el juego se reinicia o comienza
    if (gameStarted) {
      setTimeLeft(initialTime);
    }
  }, [gameStarted, initialTime]);

  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) {
      if (timeLeft <= 0 && gameStarted) {
        onTimeUp(); // Llama a onTimeUp solo si el tiempo se acabó durante el juego
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta o timeLeft cambia
  }, [timeLeft, onTimeUp, gameStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timer-container">
      <p className="timer-text">Tiempo restante: {formatTime(timeLeft)}</p>
    </div>
  );
}

export default Timer;
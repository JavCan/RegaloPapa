import React, { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
// No necesitamos un archivo CSS específico para este componente si no tiene elementos visuales propios.
// import './Confetti.css'; 

function Confetti({ isActive }) {
  const fireConfetti = useCallback(() => {
    // Configuración básica del confeti
    // Puedes experimentar con estas opciones para diferentes efectos
    const defaults = { 
      spread: 90, // Ángulo de dispersión
      ticks: 50, // Cuántas veces se actualiza la animación de las partículas
      gravity: 0.5, // Gravedad más baja para que caiga más lento
      decay: 0.94, // Cuánto se desaceleran las partículas
      startVelocity: 30, // Velocidad inicial
      particleCount: 150, // Cantidad de partículas
      origin: { y: 0 } // Origen un poco más abajo de la parte superior
    };

    // Disparar varias ráfagas para un efecto más completo
    confetti({ ...defaults, particleCount: 100, spread: 60, origin: { x: 0.2, y: 0.6 } });
    confetti({ ...defaults, particleCount: 150, spread: 90, origin: { x: 0.5, y: 0.5 } });
    confetti({ ...defaults, particleCount: 100, spread: 60, origin: { x: 0.8, y: 0.6 } });

    // Otra configuración solicitada: { spread: 90, particleCount: 150 }
    // confetti({
    //   particleCount: 150,
    //   spread: 90,
    //   origin: { y: 0.6 },
    //   colors: ['#FFD700', '#007BFF', '#DC3545'] // Dorado, Azul, Rojo (colores de ejemplo)
    // });

  }, []);

  useEffect(() => {
    if (isActive) {
      fireConfetti();
    }
  }, [isActive, fireConfetti]);

  // Este componente no renderiza nada visible por sí mismo, solo dispara el efecto.
  return null;
}

export default Confetti;
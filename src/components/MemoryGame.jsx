import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

// Importa las imágenes desde la carpeta public
// Asegúrate de que las rutas sean correctas y que tengas 8 imágenes únicas.
const cardImages = [
  { "src": "/beis.jpg", matched: false },
  { "src": "/billar.png", matched: false },
  { "src": "/ca.png", matched: false },
  { "src": "/cafe.jpg", matched: false },
  { "src": "/cfe.jpg", matched: false },
  { "src": "/chancla.jpg", matched: false },
  { "src": "/home.png", matched: false },
  { "src": "/inv.png", matched: false },
];

// Rutas a los archivos de sonido (asegúrate que estén en public/sounds/)
const flipSound = new Audio('/sounds/flip.mp3');
const matchSound = new Audio('/sounds/match.mp3');

function MemoryGame({ onGameWin, gameStarted, onGameStart }) { // Añadir gameStarted y onGameStart
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [pairsFound, setPairsFound] = useState(0);

  // Duplicar y barajar cartas
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setPairsFound(0);
    setDisabled(false); // Asegurarse de que las cartas no estén deshabilitadas al inicio
  };

  // Manejar una elección
  const handleChoice = (card) => {
    if (card.id === choiceOne?.id || card.matched) return; // Evitar doble clic o clic en carta ya emparejada
    
    flipSound.play().catch(e => console.error("Error al reproducir sonido de volteo:", e)); // Reproducir sonido de volteo

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Comparar 2 cartas seleccionadas
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        matchSound.play().catch(e => console.error("Error al reproducir sonido de acierto:", e)); // Reproducir sonido de acierto
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        setPairsFound(prev => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000); // Esperar antes de voltear si no son pareja
      }
    }
  }, [choiceOne, choiceTwo]);

  // Comprobar si se han encontrado todos los pares
  useEffect(() => {
    if (cardImages.length > 0 && pairsFound === cardImages.length && gameStarted) { // Solo ganar si el juego está activo
      onGameWin();
    }
  }, [pairsFound, onGameWin, gameStarted, cardImages.length]);

  // Reiniciar elecciones y aumentar turno
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Iniciar un nuevo juego automáticamente
  useEffect(() => {
    if (gameStarted) {
      shuffleCards();
    }
  }, [gameStarted]); // Se ejecuta cuando gameStarted cambia

  const handleNewGameClick = () => {
    onGameStart(); // Llama a la función de App para reiniciar el estado global
    // shuffleCards() se llamará a través del useEffect de gameStarted
  };

  if (!gameStarted && pairsFound < cardImages.length) {
      // Opcional: podrías mostrar un overlay o mensaje para iniciar el juego
      // Por ahora, no renderizamos el juego si no ha comenzado y no se ha ganado.
      // Esto evita que se muestre brevemente antes de que App.jsx lo oculte.
      // O, si quieres que el botón de "Nuevo Juego" de MemoryGame siempre esté visible:
      // return <button onClick={handleNewGameClick} className="new-game-button">Iniciar Juego</button>;
      return null; // O un placeholder si prefieres
  }

  return (
    <div className="memory-game">
      <p>Intentos: {turns}</p>
      {/* El botón ahora llama a handleNewGameClick */}
      <button onClick={handleNewGameClick} className="new-game-button">Nuevo Juego</button>
      <div className="card-grid">
        {cards.map(card => (
          <div 
            className={`card ${card.matched ? 'matched' : ''} ${(card === choiceOne || card === choiceTwo || card.matched) ? 'flipped' : ''}`}
            key={card.id}
            onClick={() => !disabled && !card.matched && gameStarted && handleChoice(card)} // Solo permitir clics si el juego ha comenzado
          >
            <img className="front" src={card.src} alt="frente de la carta" />
            <img className="back" src="/cover.png" alt="dorso de la carta" /> {/* Asegúrate de tener una imagen cover.png en public/img/ o ajusta la ruta */} 
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
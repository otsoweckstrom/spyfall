import React, { useState, ChangeEvent, useEffect } from 'react';

import '../styles/game.css';
import locations from '../data/locations';

const Game = () => {
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);
  const [playerNames, setPlayerNames] = useState<string[]>([
    'Jaakko',
    'Pekka',
    'Marjutta',
    'Pärinäeero',
  ]);
  const [currentName, setCurrentName] = useState<string>('');
  const [gameState, setGameState] = useState<string>('lobby');
  const [location, setLocation] = useState<string>('');
  const [spy, setSpy] = useState<string>('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isLocationRevealed, setIsLocationRevealed] = useState(false);
  const currentPlayer = playerNames[currentPlayerIndex];

  //TIMER
  useEffect(() => {
    // Decrease the time remaining every second
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the timer when the component is unmounted or time runs out
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };

  const handleAddPlayer = () => {
    if (currentName.trim() !== '') {
      setPlayerNames([...playerNames, currentName]);
      setCurrentName('');
    }
  };
  const chooseRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
  };
  const chooseRandomSpy = () => {
    const randomIndex = Math.floor(Math.random() * playerNames.length);
    return playerNames[randomIndex];
  };

  const handleStartGame = () => {
    setLocation(chooseRandomLocation);
    setSpy(chooseRandomSpy);
    setGameState('setup');
  };
  const handleReturnToLobby = () => {
    setGameState('lobby');
    setIsLocationRevealed(false);
    setCurrentPlayerIndex(0);
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex === playerNames.length - 1) {
      // Last player reached, reset to the first player
      setGameState('game');
      setIsLocationRevealed(false);
      setTimeRemaining(600);
    } else {
      // Move to the next player
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setIsLocationRevealed(false);
    }
  };
  const handleToggleLocation = () => {
    setIsLocationRevealed(!isLocationRevealed);
  };

  return (
    <div className="">
      {gameState === 'lobby' ? (
        <div>
          <h2>Introduce your spies</h2>
          <div className="input-container">
            <input
              type="text"
              value={currentName}
              onChange={handleInputChange}
              placeholder="Enter player name"
            />
          </div>
          <button onClick={handleAddPlayer}>Add Player</button>
          <div>
            <h3>Player Names:</h3>
            <ul>
              {playerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
          <button className="startgame-button" onClick={handleStartGame}>
            Start the game
          </button>
        </div>
      ) : gameState === 'setup' ? (
        <div>
          <h2>{currentPlayer}</h2>
          {isLocationRevealed && currentPlayer !== spy ? (
            <div>
              <p>Location: {location}</p>
              <button className="gotit-button" onClick={handleNextPlayer}>
                Got it!
              </button>
            </div>
          ) : isLocationRevealed && currentPlayer === spy ? (
            <div>
              <p>spy</p>
              <button className="gotit-button" onClick={handleNextPlayer}>
                Got it!
              </button>
            </div>
          ) : (
            <div>
              <button className="reveal-button" onClick={handleToggleLocation}>
                Reveal Location
              </button>
            </div>
          )}
        </div>
      ) : gameState === 'game' ? (
        <div className="timer-container">
          <h2>{formattedTime}</h2>
        </div>
      ) : (
        <div></div>
      )}
      {gameState !== 'lobby' ? (
        <div>
          <button
            className="returntolobby-button"
            onClick={handleReturnToLobby}
          >
            Return to lobby
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Game;

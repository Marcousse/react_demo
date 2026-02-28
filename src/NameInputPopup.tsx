import { useState } from "preact/hooks";

/**
 * A popup for players to enter their name before starting the game.
 * 
 * @param {Function} props.onConfirm - Callback function for when the player confirms their name.
 * 
 * @returns {JSX.Element}
 */
export function NameInputPopup({ onConfirm }) {
  const [playerName, setPlayerName] = useState('');

  return (
    <div class='popup'>
      <input type='text' placeholder='Enter your name' value={playerName} onInput={(e) => setPlayerName(e.target.value)} />
      <button onClick={() => {
        if (playerName != '')
          onConfirm(playerName);
      }}>
        Start Game
      </button>
    </div>
  );
}
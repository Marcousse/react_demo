import { useState } from 'preact/hooks';

/**
 * A popup displayed when a run ends.
 *
 * @param {Function} onReturn - Callback function to return to the main menu.
 * @param {Function} onRestart - Callback function to restart the game.
 * 
 * @returns {JSX.Element}
 */
export function GameOverPopup({ onReturn, onRestart }) {
    const [showPopup, setShowPopup] = useState(true);

    return (
        <div class='popup' style={{ display: showPopup ? 'block' : 'none' }}>
            <h2>Game Over</h2>
            <p>Do you want to play again?</p>
            <button onClick={() => {
                setShowPopup(false);
                onReturn();
            }}>Return to Menu</button>
            <button onClick={() => {
                onRestart();
            }}>Restart</button>
        </div>
    );
}
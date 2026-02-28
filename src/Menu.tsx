import { useEffect, useState } from 'preact/hooks';
import './index.css';
import { LeaderboardPopup } from './LeaderboardPopup.tsx';
import { NameInputPopup } from './NameInputPopup.tsx';

/**
 * Displays main menu
 * 
 * @param {Object} props
 * @param {Function} props.onPlay Callback function to start the game with the given player name
 * @param {Array} props.highScores Array of high score entries
 * 
 * @returns {JSX.Element}
 */
export function Menu({ onPlay, highScores }) {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [playerName, setPlayerName] = useState('');
    return (
        <div class='menu'>
            <h1>Menu</h1>
            <button onClick={() => setShowNameInput(true)}>Play</button>
            <button onClick={() => setShowLeaderboard(true)}>Leaderboard</button>
            {showLeaderboard && <LeaderboardPopup onReturn={() => setShowLeaderboard(false)} entries={highScores} />}
            {showNameInput && <NameInputPopup onConfirm={
                (name) => {
                    setShowNameInput(false);
                    onPlay(name);
                }
            } />}
        </div>
    );
}
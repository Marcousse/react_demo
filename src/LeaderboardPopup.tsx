/**
 * A popup to display leaderboard entries.
 *
 * @param {Object} props
 * @param {Function} props.onReturn - Callback function to return to menu.
 * @param {Array} props.entries - Array of leaderboard entries.
 *
 * @returns {JSX.Element}
 */
export function LeaderboardPopup({ onReturn, entries }) {
    return (
        <div class="popup">
            <h2>Leaderboard</h2>
            <ul>
                {entries.map((player, index) => (
                    <li key={index}>
                        {player.name}: {player.score}
                    </li>
                ))}
            </ul>
            <button onClick={onReturn}>Return</button>
        </div>
    );
}
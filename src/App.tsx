import { useEffect, useState } from "preact/hooks";
import { Board } from "./Board";
import { Menu } from "./Menu";
import { ToggleSwitch } from "./ToggleSwitch";

/**
 * Main component. Manages game state and dark/light mode.
 */
export function App() {
    const [showBoard, setShowBoard] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const storedHighScores = localStorage.getItem('highScores');
        if (storedHighScores) {
            setHighScores(JSON.parse(storedHighScores));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }, [highScores]);

    function registerHighScore(level) {
        const newHighScores = highScores.map((score) => {
            if (score.name == playerName) {
                return { ...score, score: Math.max(score.score, level) };
            } else {
                return score;
            }
        });
        setHighScores(newHighScores);
    }

    return (
        <div>
            {showBoard ? (
                <div>
                    <ToggleSwitch isToggled={isDarkMode} onToggle={() => {
                        setIsDarkMode(!isDarkMode);
                        if (isDarkMode)
                            document.querySelector("body").setAttribute('theme', 'dark');
                        else
                            document.querySelector("body").setAttribute('theme', 'light');
                    }} />
                    <Board onReturn={() => { setShowBoard(false) }} onGameEnd={registerHighScore} />
                </div>
            ) : (
                <div>
                    <ToggleSwitch isToggled={isDarkMode} onToggle={() => {
                        setIsDarkMode(!isDarkMode);
                        if (isDarkMode)
                            document.querySelector("body").setAttribute('theme', 'dark');
                        else
                            document.querySelector("body").setAttribute('theme', 'light');
                    }} />
                    <Menu onPlay={(name) => {
                        setPlayerName(name);
                        setShowBoard(true);
                    }} highScores={highScores} />
                </div>
            )}
        </div>
    );
}
import { useEffect, useState } from "preact/hooks";
import { Row } from "./Row";
import { Piece, Player } from "./Piece";
import { GameOverPopup } from "./GameOverPopup";

/**
 * Displays the game board.
 *
 * @param {Object} props
 * @param {Function} props.onReturn - Callback function to return to the main menu.
 * @param {Function} props.onGameEnd - Callback function for when a run ends.
 * 
 * @returns {JSX.Element}
 */
export function Board({ onReturn, onGameEnd }) {

    const board_size = 8;
    const [isGameOver, setIsGameOver] = useState(false);
    const [playerStats, setPlayerStats] = useState<[Player, Piece]>([{ xp: 0, level: 1 }, { position: [5, 5], max_hp: 8, hp: 8, damage: 2, sprite: "src/assets/knight.png" }]);

    const [pieces, setPieces] = useState<Piece[]>([
        { position: [5, 7], max_hp: 8, hp: 4, damage: 1, sprite: "src/assets/silly_goober.png" },
        playerStats[1]
    ]);

    const [boardState, setBoardState] = useState<Piece[][]>(() => {
        const initialBoardState = Array.from({ length: board_size }, () => Array(board_size).fill(null));

        pieces.forEach(piece => {
            initialBoardState[piece.position[0]][piece.position[1]] = piece;
        });

        return initialBoardState;
    });

    // Update boardState whenever the pieces array changes
    useEffect(() => {
        const newBoardState = Array.from({ length: board_size }, () => Array(board_size).fill(null));

        pieces.forEach(piece => {
            newBoardState[piece.position[0]][piece.position[1]] = piece;
        });

        setBoardState(newBoardState);
    }, [pieces]);

    const handleKeyDown = (event) => {
        const newPosition = [...playerStats[1].position];
        switch (event.key) {
            case 'w':
                newPosition[0] -= 1;
                break;
            case 's':
                newPosition[0] += 1;
                break;
            case 'a':
                newPosition[1] -= 1;
                break;
            case 'd':
                newPosition[1] += 1;
                break;
        }

        //wrap movement around board
        if (newPosition[0] >= board_size)
            newPosition[0] = 0;
        if (newPosition[1] >= board_size)
            newPosition[1] = 0;
        if (newPosition[0] < 0)
            newPosition[0] = board_size - 1;
        if (newPosition[1] < 0)
            newPosition[1] = board_size - 1;

        let adjacentPiece = boardState[newPosition[0]][newPosition[1]];
        if (adjacentPiece == null) {
            if (playerStats[1].hp < playerStats[1].max_hp)
                playerStats[1].hp += Math.floor(1 + Math.log(playerStats[0].level));
            if (playerStats[1].hp > playerStats[1].max_hp)
                playerStats[1].hp = playerStats[1].max_hp;
            const newPlayerStats = playerStats;
            newPlayerStats[1].position = [newPosition[0], newPosition[1]];
            setPlayerStats([...newPlayerStats]);
            updateEnemies();
        } else if (adjacentPiece != playerStats[1]) {
            if (newPosition[0] >= 0 && newPosition[0] < board_size && newPosition[1] >= 0 && newPosition[1] < board_size)
                adjacentPiece.hp -= playerStats[1].damage;
            if (adjacentPiece.hp <= 0) {
                playerStats[0].xp += adjacentPiece.max_hp + adjacentPiece.damage;
                while (playerStats[0].xp >= 10) {
                    //console.log("level up ", playerStats[0].level);
                    playerStats[0].xp -= 10;
                    playerStats[0].level += 1;
                }
                playerStats[1].hp = Math.floor((playerStats[1].hp / playerStats[1].max_hp) * playerStats[0].level * 8);
                playerStats[1].max_hp = playerStats[0].level * 8;
                playerStats[1].damage = playerStats[0].level * 2;
            }
            updateEnemies();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // Update enemy positions
    function updateEnemies() {
        let newPieces = [...pieces];
        newPieces.forEach(piece => {
            let newPosition = [...piece.position];
            let diff_row = playerStats[1].position[0] - piece.position[0]
            let diff_col = playerStats[1].position[1] - piece.position[1]
            newPosition[0] += Math.sign(diff_row);
            newPosition[1] += Math.sign(diff_col);
            if (!newPieces.some(piece => {
                return piece.position[0] == newPosition[0] && piece.position[1] == newPosition[1];
            }) && newPosition[0] < board_size && newPosition[0] >= 0 && newPosition[1] < board_size && newPosition[1] >= 0) {
                if (Math.random() > 0.5) {
                    piece.position[0] = newPosition[0];
                    piece.position[1] = newPosition[1];
                }
            } else {
                if (playerStats[1].position[0] == newPosition[0] && playerStats[1].position[1] == newPosition[1] && playerStats[1] != piece) {
                    playerStats[1].hp -= piece.damage;
                    if (playerStats[1].hp <= 0)
                        setIsGameOver(true);
                }
            }
        });
        spawnEnemies(newPieces, playerStats[0].level);
        newPieces = newPieces.filter(piece => piece.hp > 0);
        setPieces([...newPieces]);
    }

    //spawn new enemies
    function spawnEnemies(newPieces, base_level) {
        //console.log("spawnEnemies", Math.random(), " ", pieces.length);
        if (Math.random() > 0.95 || pieces.length < 2) {
            let level = Math.floor(base_level * 0.5 + Math.random() * base_level) * 8;
            //console.log("level: ", level);
            let spawn_side = Math.floor(Math.random() * 4);
            let spawn_i = Math.floor(Math.random() * board_size);
            let spawn_position
            switch (spawn_side) {
                case 0: clearInterval
                    spawn_position = [0, spawn_i];
                    break;
                case 1:
                    spawn_position = [board_size - 1, spawn_i];
                    break;
                case 2:
                    spawn_position = [spawn_i, 0];
                    break;
                default:
                    spawn_position = [spawn_i, board_size - 1];
                    break;
            }
            newPieces.push({ position: spawn_position, max_hp: Math.floor(level * 0.8), hp: Math.floor(level * 0.8), damage: Math.floor(level * 0.2), sprite: "src/assets/silly_goober.png" });
        }
    }

    const rows = [];
    for (let row = 0; row < board_size; row++) {
        rows.push(Row(row, board_size, boardState[row]));
    }

    return (
        <div>
            <div class="game">
                <p > Level: {playerStats[0].level}</p>
                <div class="board">
                    {rows}
                </div>
            </div>
            {isGameOver && (
                <GameOverPopup onReturn={() => {
                    onGameEnd(playerStats[0].level)
                    onReturn();
                }} onRestart={() => {
                    onGameEnd(playerStats[0].level);
                    setIsGameOver(false);
                }} />
            )}
        </div>
    );
}
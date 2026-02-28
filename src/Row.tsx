import { Square } from "./Square";

/**
 * A single row of the game board.
 * 
 * @param {number} row - The row index.
 * @param {number} board_size - Number of columns.
 * @param {Array} boardStateRow - Array representing the state of squares in this row.
 * 
 * @returns {JSX.Element}
 */
export function Row(row, board_size, boardStateRow) {
    const squares = [];
    for (let col = 0; col < board_size; col++) {
        if (boardStateRow[col]) {
            squares.push(Square(row, col, boardStateRow[col].sprite, boardStateRow[col].hp, boardStateRow[col].damage));
        } else {
            squares.push(Square(row, col));
        }
    }
    return <div key={row} class="board-row">
        {squares}
    </div>;
}
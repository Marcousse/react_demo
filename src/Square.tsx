/**
 * Single square of the game board.
 * 
 * @param {number} row - Row index of square.
 * @param {number} col - Column index of square.
 * @param {string} sprite - Optional sprite to display on the square.
 * @param {number} hp - Optional hp value.
 * @param {number} damage - Optional damage value.
 * 
 * @returns {JSX.Element}
 */
export function Square(row, col, sprite = null, hp = null, damage = null) {
    if (sprite != null) {
        return (
            <div class={`board-square ${(row + col) % 2 == 0 ? 'light-square' : 'dark-square'}`}>
                <div class='stats'>
                    <div class='hp-value'>
                        {hp}
                    </div>
                    <div class='damage-value'>
                        {damage}
                    </div>
                </div>
                <img src={sprite} class='board-icon' />
            </div>
        );
    } else {
        return (
            <div
                class={`board-square ${(row + col) % 2 == 0 ? 'light-square' : 'dark-square'}`}
            />
        );
    }
}
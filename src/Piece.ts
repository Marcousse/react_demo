export type Piece = {
    max_hp: number;
    hp: number;
    damage: number;
    position: [number, number];
    sprite: string;
}

export type Player = {
    xp: number;
    level: number;
}
export type GameData = {
    gameId: string;
    gameState: string;
    timerEnd: string | null;
}

export type GameOptions = {
    timerDuration: number;
    isHostPlayer: boolean;
}
export type GameState =
    | null
    | "LOBBY"
    | "PRE_QUESTION"
    | "QUESTION"
    | "ASSIGN"
    | "PRE_ANSWER"
    | "ANSWER"
    | "PRE_VOTE"
    | "FIND_BALLOT"
    | "DISPLAY_BALLOT"
    | "VOTE"
    | "DISPLAY_VOTES"
    | "SCORE"
    | "POSTGAME"
    | "DELETED_BY_INSUFFICIENT_PLAYERS"
    | "DELETED_BY_HOST"
    | "DELETED_BY_CLEAN_UP"

export type GameData = {
    gameId: string;
    gameState: GameState;
    timerEnd: string | null;
};

export type GameOptions = {
    timerDuration: number;
    isHostPlayer: boolean;
};

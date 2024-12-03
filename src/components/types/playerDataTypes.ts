export interface Player {
    playerId: string;
    name: string;
    shape: number;
    color: string;
    score: number;
}

export interface PlayerData {
    player: Player;
    ready: boolean;
    leader: boolean;
}

export interface WatchPlayersData {
    players: PlayerData[];
}
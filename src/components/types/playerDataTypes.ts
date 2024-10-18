export interface Player {
    playerId: string;
    name: string;
    shape: number;
    color: string;
}

export interface PlayerData {
    player: Player;
    ready: boolean;
}

export interface WatchPlayersData {
    players: PlayerData[];
}
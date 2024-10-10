export interface Player {
    playerId: string;
    name: string;
}

export interface PlayerData {
    player: Player;
    ready: boolean;
}

export interface WatchPlayersData {
    players: PlayerData[];
}
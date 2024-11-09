import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { createGameApi, getGameByHostIdApi, getGameByIdApi, updateGameStateApi } from './api/gameApi';
import { getSessionRole } from './api/sessionApi';
import { getPlayerById } from './api/playerApi';
import ChooseRole from './components/home/ChooseRole';
import JoinGame from './components/join/JoinGame';
import Host from './components/host/Host';
import Player from './components/player/Player';
import ErrorModal from './components/common/ErrorModal';
import GameState from './components/websocket/GameState';
import './styles/styles.css';
import DevDisplay from './components/DevDisplay';
import { getColorScheme } from './utils/ColorUtils';
import { ColorMapping } from './components/types/ColorMappingType';
import Header from './components/common/Header';
import LilGuySelect from './components/join/LilGuySelect';
import Waiting from './components/common/Waiting';
import './styles/fonts/Eracake.otf';

// Define the role types
type Role = 'HOST' | 'PLAYER' | 'PLAYER_CREATION' | 'UNASSIGNED';

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [gameState, setGameState] = useState<string>("");
    const [gameId, setGameId] = useState<string>("");
    const [role, setRole] = useState<Role>("UNASSIGNED");
    const [connected, setConnected] = useState<boolean>(false);
    const [playerId, setPlayerId] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");
    const [hostId, setHostId] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [devDisplayOpen, setDevDisplayOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>("PURPLE");

    const [devRoleDeclaration, setDevRoleDeclaration] = useState<Role>();

    // Hook to access the current route
    const location = useLocation();

    // on page load, retrieve any existing role from backend via session cookie
    // also, check if the route supplied included a game ID and if so, add to that game
    // if theres a conflict between a pre-existing role and the the game ID supplied in the QR code, let
    // the user know that they must exit their current game before joining a new one
    useEffect(() => {
        setLoading(true);

        if (devRoleDeclaration) {
            setRole(devRoleDeclaration);
            return;
        }

        const initializeGame = async () => {
            try {
                // Get the role directly from API
                const newRole = await getSessionRole();
                console.log(newRole);
                setRole(newRole);
                setConnected(true);

                // Now, based on the role, decide game loading behavior
                const match = location.pathname.match(/^\/game\/(.+)/);
                if (match) {
                    const extractedGameId = match[1];
                    try {
                        await getGameByIdApi(extractedGameId);

                        // Check role before assigning PLAYER_CREATION
                        if (newRole === "UNASSIGNED" || newRole === null) {
                            setRole("PLAYER_CREATION");
                            console.log("Assigned role: PLAYER_CREATION");
                        } else {
                            setErrorMessage(
                                "You cannot join a new game until you leave your current game."
                            );
                        }
                        setGameId(extractedGameId);
                    } catch (error) {
                        setErrorMessage(
                            "The game you're trying to join does not exist"
                        );
                    }
                } else {
                    setGameId(""); // Reset if not on a game route
                }
                // Remove extra path from URL without reloading
                window.history.replaceState(null, "", "/");
            } catch (err: any) {
                setConnected(false);
                if (err instanceof Error && err.message === "Failed to fetch") {
                    setErrorMessage(
                        "There was an error connecting to the game server."
                    );
                }
            }
        };

        initializeGame();
    }, []);

    // on page load, retrieve any game data related to any existing role
    useEffect(() => {
        console.log(role);
        if (role === "UNASSIGNED") {
            setLoading(false);
            return;
        }

        const getDataById = async (): Promise<void> => {
            try {
                if (role === "HOST") {
                    const game = await getGameByHostIdApi();
                    setHostId(game.hostId);
                    setGameId(game.gameId);
                    setGameState(game.gameState);
                } else if (role === "PLAYER") {
                    const player = await getPlayerById();
                    setPlayerId(player.playerId);
                    setPlayerName(player.name);
                    setColor(player.color);
                    const game = await getGameByIdApi(player.gameId);
                    setGameId(game.gameId);
                    setGameState(game.gameState);
                }
            } catch (err: any) {
                setErrorMessage("There was an error loading your current game");
                resetUserSession();
            } finally {
                setLoading(false);
            }
        };

        if (role) {
            getDataById();
        }
    }, [role]);

    // effect to change app colors on update of "color" state variable
    useEffect(() => {
        const colorScheme = getColorScheme(color);
        const rootElement = document.getElementById("root");

        if (rootElement) {
            rootElement.style.backgroundImage = 
                `radial-gradient(${colorScheme.text} 13.6%, transparent 3.6%),
                 radial-gradient(${colorScheme.text} 13.6%, transparent 3.6%)`;
            rootElement.style.backgroundColor = colorScheme.bg;
        }
    }, [color]);

    const createAndHostGame = async () => {
        try {
            const game = await createGameApi(); // Call API to create a new game
            setGameId(game.gameId); // Set gameId returned from backend
            setGameState(game.gameState); // Set gameState returned from backend
            setRole("HOST"); // Update role to 'HOST' after game creation
        } catch (error) {
            console.error("Error creating and hosting game:", error);
        }
    };

    const resetUserSession = () => {
        console.log("RESET USER SESSION");
        setGameId("");
        setGameState("");
        setRole("UNASSIGNED");
        setPlayerId("");
        setHostId("");
        setColor("PURPLE");
    };

    const setRoleToPlayer = () => {
        setRole("PLAYER");
    };

    const joinGame = (): void => {
        setRole("PLAYER_CREATION");
    };

    const startGame = (): void => {
        updateGameStateApi(gameId);
    };

    const updateLocalState = (state: string): void => {
        if (state.includes("DELETED_BY")) {
            switch (state) {
                case "DELETED_BY_INSUFFICIENT_PLAYERS":
                    setErrorMessage(
                        `Game ${gameId} was deleted because there were insufficient players remaining.`
                    );
                    resetUserSession();
                    break;
                case "DELETED_BY_HOST":
                    setErrorMessage(`Game ${gameId} was deleted by the host.`);
                    resetUserSession();
                    break;
                case "DELETED_BY_CLEAN_UP":
                    setErrorMessage(
                        `Game ${gameId} reached its time limit and was deleted automatically.`
                    );
                    resetUserSession();
                    break;
            }
        } else {
            setGameState(state);
        }
    };

    const closeErrorModal = () => {
        setErrorMessage("");
    };

    const toggleDevDisplay = () => {
        setDevDisplayOpen(!devDisplayOpen);
    };

    const updateColor = (color: string) => {
        setColor(color);
    };

    const renderComponent = (
        role: Role,
        loading: boolean
    ): JSX.Element | null => {
        if (loading) {
            return <Waiting message={"LOADING"} />;
        } else if (role === "UNASSIGNED") {
            return (
                <>
                    <div className="container no-top-margin">
                        <p className="logo">JOKE ZONE</p>
                    </div>
                    <ChooseRole
                        onChooseHost={createAndHostGame}
                        onChooseJoin={joinGame}
                    />
                </>
            );
        } else if (role === "HOST" && gameId) {
            return (
                <Host
                    gameId={gameId}
                    gameState={gameState}
                    onCancelHost={resetUserSession}
                    onStartGame={startGame}
                    color={color}
                />
            );
        } else if (role === "PLAYER_CREATION") {
            return (
                <JoinGame
                    onCreatePlayer={setRoleToPlayer}
                    onCancelJoin={resetUserSession}
                    onColorSelect={updateColor}
                    gameId={gameId}
                    color={color}
                />
            );
        } else if (role === "PLAYER" && gameId) {
            return (
                <Player
                    gameId={gameId}
                    playerId={playerId}
                    gameState={gameState}
                    playerName={playerName}
                    onCancelPlayer={resetUserSession}
                    color={color}
                />
            );
        }

        return null;
    };

    return (
        <>
            {errorMessage && (
                <ErrorModal message={errorMessage} onClose={closeErrorModal} />
            )}
            {role && renderComponent(role, loading)}
            {gameId && (
                <GameState
                    onGameStateUpdate={updateLocalState}
                    gameId={gameId}
                />
            )}
            <button onClick={toggleDevDisplay}>Toggle Developer Panel</button>
            {devDisplayOpen && (
                <DevDisplay
                    gameId={gameId}
                    gameState={gameState}
                    role={role ? role : "undefined"}
                    hostId={hostId}
                    playerId={playerId}
                    loading={loading}
                    color={color}
                />
            )}
        </>
    );
}

export default App;

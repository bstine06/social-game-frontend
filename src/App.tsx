import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createGameApi, getGameByHostIdApi, getGameByIdApi, updateGameStateApi } from './api/gameApi';
import { getSessionRole } from './api/sessionApi';
import { getPlayerById } from './api/playerApi';
import { useTheme } from './utils/ThemeContext';
import ChooseRole from './components/home/ChooseRole';
import JoinGame from './components/join/JoinGame';
import Host from './components/host/Host';
import Player from './components/player/Player';
import ErrorModal from './components/common/ErrorModal';
import GameState from './components/websocket/GameState';
import './styles/styles.css';
import DevDisplay from './components/DevDisplay';
import { getColorScheme } from './utils/ColorUtils';
import Waiting from './components/common/Waiting';
import './styles/fonts/Eracake.otf';
import StaticNotification from './components/home/StaticNotification';

// Define the role types
type Role = 'HOST' | 'PLAYER' | 'PLAYER_CREATION' | 'UNASSIGNED' | 'PENDING';

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [gameState, setGameState] = useState<string>("");
    const [gameId, setGameId] = useState<string>("");
    const [role, setRole] = useState<Role>("PENDING");
    const [connected, setConnected] = useState<boolean>(false);
    const [playerId, setPlayerId] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");
    const [hostId, setHostId] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [devDisplayOpen, setDevDisplayOpen] = useState<boolean>(false);

    const { themeColor, setThemeColor } = useTheme();

    const [devRoleDeclaration, setDevRoleDeclaration] = useState<Role>();

    // Hook to access the current route
    const location = useLocation();

    useEffect(()=> {
        console.log("PLAYER ID: " + playerId);
    }, [playerId]);

    // Function to retrieve data by role
    const getDataById = async (role: string): Promise<void> => {
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
                setThemeColor(player.color);
                const game = await getGameByIdApi(player.gameId);
                setGameId(game.gameId);
                setGameState(game.gameState);
            }
        } catch (err: any) {
            setErrorMessage("There was an error loading your current game");
            resetUserSession();
        }
    };

    // on page load, retrieve any existing role from backend via session cookie
    // also, check if the route supplied included a game ID and if so, add to that game
    // if theres a conflict between a pre-existing role and the the game ID supplied in the QR code, let
    // the user know that they must exit their current game before joining a new one
    useEffect(() => {
        setLoading(true);
    
        const initializeGame = async () => {
            try {
                // Dev role check
                if (devRoleDeclaration) {
                    setRole(devRoleDeclaration);
                    return;
                }
    
                // Check if the URL includes a game to join
                const match = location.pathname.match(/^\/game\/(.+)/);
    
                // Retrieve role from backend
                const newRole = await getSessionRole();
                console.log("ROLE FROM BACKEND: " + newRole);
                setConnected(true);
    
                // If no game in URL, set the role directly
                if (!match) {
                    setRole(newRole);
                }
    
                if (match) {
                    const extractedGameId = match[1];
                    try {
                        await getGameByIdApi(extractedGameId);
                        setLoading(false);
    
                        // Check role before assigning PLAYER_CREATION
                        if (newRole === "UNASSIGNED") {
                            setRole("PLAYER_CREATION");
                        } else {
                            setRole(newRole);
                            setErrorMessage(
                                "You're already in a game. Exit this game to join a new one."
                            );
                        }
                        setGameId(extractedGameId);
                    } catch (error) {
                        setErrorMessage("The game you're trying to join does not exist");
                    }
                }
    
                // Clean up URL if there was an extra path
                window.history.replaceState(null, "", "/");
    
                // Proceed with data retrieval based on the assigned role
                if (newRole !== "UNASSIGNED") {
                    await getDataById(newRole);
                }
    
            } catch (err: any) {
                setConnected(false);
                if (err instanceof Error && err.message === "Failed to fetch") {
                    setErrorMessage("There was an error connecting to the game server.");
                    setRole("UNASSIGNED");
                }
            } finally {
                setLoading(false);
            }
        };
    
        initializeGame();
    }, []);

    useEffect(() => {
        getDataById(role);
    }, [role]),
    

    // effect to change app colors on update of "color" state variable
    useEffect(() => {
        const colorScheme = getColorScheme(themeColor);
        const rootElement = document.getElementById("root");
        const bodyElement = document.body;
    
        if (rootElement) {
            rootElement.style.backgroundImage = 
                `radial-gradient(${colorScheme.text} 13.6%, transparent 3.6%),
                 radial-gradient(${colorScheme.text} 13.6%, transparent 3.6%)`;
            rootElement.style.backgroundColor = colorScheme.bg;
        }
    
        // Change the color of the html element
        if (bodyElement) {
            bodyElement.style.backgroundColor = colorScheme.bg; // example background color
        }
    }, [themeColor]);
    

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
        setThemeColor("PURPLE");
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
        setThemeColor(color);
    };

    const reloadPage = () => {
        window.location.reload();
    }

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
                    {!connected && <StaticNotification 
                        message={"We're having trouble connecting to the server. Reloading may help."} 
                        onButtonPress={reloadPage}
                        buttonText={"Reload"}
                    />}
                    <ChooseRole
                        isConnected = {connected}
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
                />
            );
        } else if (role === "PLAYER_CREATION") {
            return (
                <JoinGame
                    onCreatePlayer={setRoleToPlayer}
                    onCancelJoin={resetUserSession}
                    gameId={gameId}
                />
            );
        } else if (role === "PLAYER" && gameId) {
            return (
                <Player
                    gameId={gameId}
                    playerId={playerId}
                    gameState={gameState}
                    onCancelPlayer={resetUserSession}
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
                    connected={connected}
                    color={themeColor}
                />
            )}
        </>
    );
}

export default App;

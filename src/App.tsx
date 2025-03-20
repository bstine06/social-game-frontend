import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createCustomGameApi, createGameApi, getGameByHostIdApi, getGameByIdApi, updateGameStateApi } from './api/gameApi';
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
import Waiting from './components/common/Waiting';
import './styles/fonts/Eracake.otf';
import StaticNotification from './components/home/StaticNotification';
import { GameData, GameOptions } from './components/types/GameDataTypes';
import HostOptions from './components/host/HostOptions';
import HostPlayer from './components/hostplayer/HostPlayer';
import HostPlayerJoinGame from './components/hostplayer/HostPlayerJoinGame';
import SpeakerSVG from './resources/SpeakerSVG';
import { useGame } from './contexts/GameContext';

// Define the role types
type Role =
    | "HOST"
    | "PLAYER"
    | "HOSTPLAYER"
    | "PLAYER_CREATION"
    | "HOSTPLAYER_CREATION"
    | "HOST_OPTIONS"
    | "UNASSIGNED"
    | "PENDING";

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [role, setRole] = useState<Role>("PENDING");
    const [playerId, setPlayerId] = useState<string>("");
    const [hostId, setHostId] = useState<string>("");
    const [connected, setConnected] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [devDisplayOpen, setDevDisplayOpen] = useState<boolean>(false);

    // Hook to access the current route
    const location = useLocation();

    const { gameData, updateGameData } = useGame();

    // Function to retrieve data by role
    const getDataById = async (role: Role): Promise<void> => {
        try {
            if (role === "HOST" || role === "HOSTPLAYER_CREATION") {
                const game = await getGameByHostIdApi();
                setHostId(game.hostId);
                updateGameData({
                    gameId: game.gameId,
                    gameState: game.gameState
                });
            } else if (role === "PLAYER" || role === "HOSTPLAYER") {
                const player = await getPlayerById();
                setPlayerId(player.playerId);
                changeThemeColor(player.color);
                const game = await getGameByIdApi(player.gameId);
                updateGameData({
                    gameId: game.gameId,
                    gameState: game.gameState
                });
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

        const reloadMessage = sessionStorage.getItem("reloadMessage");
        if (reloadMessage) {
            setErrorMessage(reloadMessage); // Show the message
            sessionStorage.removeItem("reloadMessage"); // Clear it after use
        }
    
        const initializeGame = async () => {
            try {
    
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
                        updateGameData({gameId: extractedGameId});
                    } catch (error) {
                        setRole("UNASSIGNED");
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
    }, [role]);

    //reload the page whenever the user returns to ensure user is immediately up to date
    useEffect(() => {
        const handleVisibilityChange = () => {
          if (document.visibilityState === "visible") {
            // Trigger a reload
            window.location.reload();
          }
        };
    
        document.addEventListener("visibilitychange", handleVisibilityChange);
    
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }, []);  

    const createAndHostGame = async (gameOptions: GameOptions) => {
        try {
            const game = await createCustomGameApi(gameOptions); // Call API to create a new game
            updateGameData({
                gameId: game.gameId,
                gameState: game.gameState
            });
            if (gameOptions.isHostPlayer) {
                setRole("HOSTPLAYER_CREATION");
            } else {
                setRole("HOST"); // Update role to 'HOST' after game creation
            }
        } catch (error) {
            setErrorMessage("There was an error creating the game.");
        }
    };

    const resetUserSession = (message?: string) => {
        setLoading(true);
        updateGameData({gameId: "",
            gameState: null,
            timerEnd: null,
            roundCount: 0
        });
        setRole("UNASSIGNED");
        setPlayerId("");
        setHostId("");
        changeThemeColor("PURPLE");
        reloadPage(message);
    };

    const changeThemeColor = (color: string) => {
        document.querySelector('body')?.setAttribute('data-theme', color);
        // setThemeColor(color);
    }

    const updateRoleAfterPlayerCreation = () => {
        if (role === "HOSTPLAYER_CREATION") {
            setRole("HOSTPLAYER")
        } else {
            setRole("PLAYER");
        }
    };

    const beginGameCreation = (): void => {
        setRole("HOST_OPTIONS");
    }

    const joinGame = (): void => {
        setRole("PLAYER_CREATION");
    };

    const updateLocalGameData = (newGameData: GameData): void => {
        if (newGameData.gameState && newGameData.gameState.includes("DELETED_BY")) {
            let message = `Game ${newGameData.gameId} was deleted`;

            switch (newGameData.gameState) {
                case "DELETED_BY_INSUFFICIENT_PLAYERS":
                    message += ` because there were insufficient players remaining.`;
                    break;
                case "DELETED_BY_HOST":
                    message += ` by the host.`;
                    break;
                case "DELETED_BY_CLEAN_UP":
                    message += ` automatically after reaching its time limit.`;
                    break;
            }
            resetUserSession(message);
        } else {
            updateGameData(newGameData);
        }
    };

    const closeErrorModal = () => {
        setErrorMessage("");
    };

    const toggleDevDisplay = () => {
        setDevDisplayOpen(!devDisplayOpen);
    };

    const updateGameId = (newGameId: string) => {
        updateGameData({
            gameId: newGameId
        });
    }

    const reloadPageWithoutMessage = () => {
        reloadPage();
    }

    const reloadPage = (message?: string) => {
        if (message !== undefined && message !== null && message !== "") {
            sessionStorage.setItem("reloadMessage", message); // Save the message
        }
        window.location.reload();
    }

    const renderComponent = (
        role: Role,
        loading: boolean
    ): JSX.Element | null => {
        if (loading) {
            return <></>;
        } else if (role === "UNASSIGNED") {
            return (
                <>
                    <div className="homepage-centered">
                    <div className="container no-top-margin">
                        <p className="logo">POP SQUIZZY</p>
                    </div>
                    {!connected && <StaticNotification 
                        message={"We're having trouble connecting to the server. Reloading may help."} 
                        onButtonPress={reloadPageWithoutMessage}
                        buttonText={"Reload"}
                    />}
                    <ChooseRole
                        isConnected = {connected}
                        onChooseHost={beginGameCreation}
                        onChooseJoin={joinGame}
                    />
                    </div>
                </>
            );
        } else if (role === "HOST_OPTIONS") {
            return (
                <HostOptions 
                    onCreateGameAsHost={createAndHostGame}
                    onCancelHost={resetUserSession}
                />
            )
        } else if (role === "HOST" && gameData.gameId) {
            return (
                <Host
                    onCancelHost={resetUserSession}
                />
            );
        } else if (role === "PLAYER_CREATION") {
            return (
                <JoinGame
                    onCreatePlayer={updateRoleAfterPlayerCreation}
                    onCancelJoin={resetUserSession}
                />
            );
        } else if (role === "HOSTPLAYER_CREATION") {
            return (
                <HostPlayerJoinGame
                    onCreatePlayer={updateRoleAfterPlayerCreation}
                    onCancelJoin={resetUserSession}
                />
            );
        } else if (role === "PLAYER" && gameData.gameId) {
            return (
                <Player
                    playerId={playerId}
                    onCancelPlayer={resetUserSession}
                />
            );
        } else if (role === "HOSTPLAYER" && gameData.gameId) {
            return (
                <HostPlayer 
                    playerId={playerId}
                    onCancelHostPlayer={resetUserSession}
                />
            )
        }

        return null;
    };

    return (
        <>
            {errorMessage && (
                <ErrorModal message={errorMessage} onClose={closeErrorModal} />
            )}
            {role && renderComponent(role, loading)}
            {gameData.gameId && gameData.gameId !== "" && (
                <GameState
                    onGameDataUpdate={updateLocalGameData}
                    onError={resetUserSession}
                    gameId={gameData.gameId}
                />
            )}
            {/* <button onClick={toggleDevDisplay}>Toggle Developer Panel</button> */}
            {devDisplayOpen && (
                <DevDisplay
                    gameId={gameData.gameId}
                    gameState={gameData.gameState}
                    role={role ? role : "undefined"}
                    playerId={playerId}
                    hostId={hostId}
                    loading={loading}
                    connected={connected}
                />
            )}
        </>
    );
}

export default App;

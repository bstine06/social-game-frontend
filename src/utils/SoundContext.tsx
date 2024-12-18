import React, { createContext, useContext, useEffect, useState } from 'react';

import lobbySong from '../resources/audio/music/lobby-song.mp3';
import demoTrack2 from '../resources/audio/music/demo-track-2.mp3';

import playerJoined from '../resources/audio/sfx/player-joined.mp3';
import playerJoined2 from '../resources/audio/sfx/player-joined-2.mp3';
import playerLeft from '../resources/audio/sfx/player-left.mp3';

type SoundName = 'playerJoined' | 'playerLeft';
type SongName = 'lobby' | 'game';

// Define context type
type SoundContextType = {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (soundName: SoundName) => void;
  setSong: (songName: SongName) => void;
};

// Create the context
const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [song, setSong] = useState<SongName | null>(null);

  // Centralized sound registry
  const sounds: Record<SoundName, HTMLAudioElement> = {
    playerJoined: (Math.random() > 0.5) ? new Audio(playerJoined) : new Audio(playerJoined2),
    playerLeft: new Audio(playerLeft),
  };

  const songs: Record<SongName, HTMLAudioElement> = {
    lobby: new Audio(lobbySong),
    game: new Audio(demoTrack2)
  }

  const toggleSound = () => setIsSoundEnabled((prev) => !prev);

  const playSound = (soundName: SoundName) => {
    if (isSoundEnabled && sounds[soundName]) {
      sounds[soundName].currentTime = 0; // Reset to the start
      sounds[soundName].play();
    }
  };

  useEffect(() => {
    console.log(song);
    // Initialize currentSong directly, assuming song is always valid
    const currentSong = song ? songs[song] : null;
  
    
      // Pause and reset all tracks when the song changes
      Object.values(songs).forEach((track) => {
        track.pause();
        track.currentTime = 0; // Reset to the beginning on song change
      });
  
    if (currentSong) {
      // If the current song is available and sound is enabled, play the song
      if (isSoundEnabled) {
        currentSong.loop = true;
        currentSong.play().catch((err) => console.warn('Failed to play music:', err));
      }
    } else {
      // Pause all music if no valid song is selected
      Object.values(songs).forEach((track) => track.pause());
    }

    // Cleanup function to stop all music when component unmounts
    return () => {
      Object.values(songs).forEach((track) => {
        track.pause();
      });
    };
  
  }, [song, isSoundEnabled]);
  

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playSound, setSong }}>
      {children}
    </SoundContext.Provider>
  );
};

// Hook for components to consume the context
export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

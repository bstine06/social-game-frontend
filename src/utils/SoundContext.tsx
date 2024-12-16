import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import clickSound from '../resources/audio/demo-track.mp3';
import successSound from '../resources/audio/demo-track.mp3';
import demoTrack from '../resources/audio/demo-track.mp3';

type SoundName = 'click' | 'success';
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
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [song, setSong] = useState<SongName>("lobby");

  // Centralized sound registry
  const sounds: Record<SoundName, HTMLAudioElement> = {
    click: new Audio(clickSound),
    success: new Audio(successSound),
  };

  const songs: Record<SongName, HTMLAudioElement> = {
    lobby: new Audio(demoTrack),
    game: new Audio(demoTrack)
  }

  const toggleSound = () => setIsSoundEnabled((prev) => !prev);

  const playSound = (soundName: SoundName) => {
    if (isSoundEnabled && sounds[soundName]) {
      sounds[soundName].currentTime = 0; // Reset to the start
      sounds[soundName].play();
    }
  };

  useEffect(() => {
    // Initialize currentSong directly, assuming song is always valid
    const currentSong = songs[song];
  
    // Keep track of the previously playing song using useRef
    const prevSong = useRef<SongName>(song);
  
    // If the song changes, reset all tracks and play the new song
    if (prevSong.current !== song) {
      // Pause and reset all tracks when the song changes
      Object.values(songs).forEach((track) => {
        track.pause();
        track.currentTime = 0; // Reset to the beginning on song change
      });
      prevSong.current = song; // Update the previously played song
    }
  
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

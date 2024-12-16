import React, { useRef, useState } from 'react';
import { useSound } from './SoundContext'; // Adjust the path as needed
import SpeakerSVG from '../resources/SpeakerSVG';

function MusicPlayer() {
  const { isSoundEnabled, toggleSound } = useSound();


  return (
    <div>
      <div className="music-btn" onClick={() => toggleSound()}>
        <SpeakerSVG active={isSoundEnabled}/>
      </div>
    </div>
  );
}

export default MusicPlayer;


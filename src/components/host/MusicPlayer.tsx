import React, { useRef, useState } from 'react';
import { useSound } from '../../contexts/SoundContext'; // Adjust the path as needed
import SpeakerSVG from '../../resources/SpeakerSVG';
import Tooltip from '../common/Tooltip';

function MusicPlayer() {
  const { isSoundEnabled, toggleSound } = useSound();


  return (
    <div>
      <Tooltip message={"click the speaker to enable sound!"}>
        <div id="music-btn" className="music-btn" onClick={() => toggleSound()}>
          <SpeakerSVG active={isSoundEnabled}/>
        </div>
      </Tooltip>
    </div>
  );
}

export default MusicPlayer;


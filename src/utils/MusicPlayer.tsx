import React, { useRef, useState } from 'react';
import demoTrack from '../resources/audio/demo-track.mp3';
import SpeakerSVG from '../resources/SpeakerSVG';

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null); // Specify the type

  const [playing, setPlaying] = useState<boolean>(false);

  const playMusic = () => {
    setPlaying(true);
    audioRef.current?.play(); // Use optional chaining
  };

  const pauseMusic = () => {
    setPlaying(false);
    audioRef.current?.pause(); // Use optional chaining
  };

  return (
    <div>
      <audio ref={audioRef} src={demoTrack} />
      <div className="music-btn" onClick={playing ? pauseMusic : playMusic}>
        <SpeakerSVG active={playing}/>
      </div>
    </div>
  );
}

export default MusicPlayer;


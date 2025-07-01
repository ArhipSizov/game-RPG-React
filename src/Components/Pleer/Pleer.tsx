import { useState, useRef, useEffect } from "react";
import musicDB from "./audioAll.json";

import "./Pleer.scss";

function Pleer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string[]>(musicDB[0]);
  const [duration, setDuration] = useState<number>(0);
  const [showPleer, setShowPleer] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  function togglePlayPause() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleTimeUpdate() {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function PlayAudio() {
    if (!audioRef.current) return;
    setIsPlaying(true);
    audioRef.current.play();
  }

  function changeMusic(where: number) {
    let nextId = Number(audioSrc[0]) + where;
    if (nextId >= musicDB.length) {
      nextId = 0;
    } else if (nextId < 0) {
      nextId = musicDB.length - 1;
    }
    setAudioSrc(musicDB[nextId]);

    setIsPlaying(false);
    setTimeout(() => {
      PlayAudio();
    }, 100);
  }

  useEffect(() => {
    if (
      formatTime(currentTime) == formatTime(duration) &&
      formatTime(duration) != "0:00"
    ) {
      changeMusic(1);
    }
  }, [formatTime(currentTime)]);
  return (
    <div className="pleer">
      <audio
        ref={audioRef}
        src={audioSrc[1]}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      {showPleer && (
        <div>
          <div className="pleer_buttons">
            <button
              className="play-prev player-icon"
              onClick={() => changeMusic(-1)}
            ></button>
            <button
              className={isPlaying ? "pause player-icon" : "play player-icon"}
              onClick={togglePlayPause}
            ></button>
            <button
              className="play-next player-icon"
              onClick={() => changeMusic(1)}
            ></button>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
          />
          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="volume">
            <img src="/audio/audioImages/volume.svg" alt="" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
      <p className="change_music_view" onClick={() => setShowPleer(!showPleer)}>
        Изменить отображение плеера
      </p>
    </div>
  );
}

export default Pleer;

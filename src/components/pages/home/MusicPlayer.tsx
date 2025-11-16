// src/components/BackgroundMusic.tsx

import { useEffect, useRef, useState } from "react";

const TRACK = {
  label: "Lofi Hip Hop Radio - Beats to Relax/Study to",
  src: "/audios/track-01.mp3",
};

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.6); // 0–1

  // Keep element’s volume in sync with state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = isLooping;
    }
  }, [volume, isLooping]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Failed to play audio", err);
        });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration || 0);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex max-w-sm flex-col gap-2 rounded-lg border bg-zinc-900/80 p-3 text-sm text-zinc-100">
      {/* Hidden native player */}
      <audio
        ref={audioRef}
        src={TRACK.src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="truncate font-medium">{TRACK.label}</div>

      {/* Progress + time */}
      <div className="flex items-center gap-2">
        <span className="w-10 text-[11px] text-zinc-400 tabular-nums">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleTimeChange}
          className="w-full"
        />
        <span className="w-10 text-right text-[11px] text-zinc-400 tabular-nums">
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePlayPause}
            className="rounded-full border px-3 py-1 text-xs hover:bg-zinc-800"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            onClick={() => setIsLooping((prev) => !prev)}
            className={`rounded-full border px-3 py-1 text-xs ${
              isLooping ? "bg-zinc-100 text-zinc-900" : "hover:bg-zinc-800"
            }`}
          >
            Loop
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400">🔊</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;

"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundMusicPlayerProps = {
  src: string;
  defaultVolume?: number;
};

export function BackgroundMusicPlayer({ src, defaultVolume = 0.5 }: BackgroundMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = defaultVolume;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    void tryPlay();

    const handleFirstInteraction = () => {
      if (!audio.paused) {
        return;
      }

      void tryPlay();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [defaultVolume]);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (nextVolume: number) => {
    const audio = audioRef.current;
    setVolume(nextVolume);

    if (!audio) {
      return;
    }

    audio.volume = nextVolume;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[linear-gradient(135deg,var(--teal-50),var(--purple-50))] px-3 py-2 shadow-lg backdrop-blur-sm sm:bottom-6 sm:right-6">
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        onClick={togglePlayback}
        className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,var(--teal-700),var(--purple-700))] text-white transition hover:brightness-110"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 10v4h3l4 4V6l-4 4H4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {isPlaying ? (
            <>
              <path d="M15 9a5 5 0 0 1 0 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M18 7a8 8 0 0 1 0 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </>
          ) : (
            <path d="m15 9 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <label className="sr-only" htmlFor="background-music-volume">Volume</label>
      <input
        id="background-music-volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(event) => handleVolumeChange(Number(event.target.value))}
        className="h-1.5 w-20 cursor-pointer accent-[var(--purple-700)] sm:w-24"
        aria-label="Background music volume"
      />
    </div>
  );
}
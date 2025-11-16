import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import useStore from "@/store";
import { Track } from "@/types";
import { cn, formatTime } from "@/utils/helpers";
import { Pause, Play, Repeat, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IMusicPlayerProps {
  track: Track | null;
}

const MusicPlayer = ({ track }: IMusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);

  const userId = useStore((state) => state.userId);

  // Keeps element’s volume in sync with state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = isLooping;
    }
  }, [volume, isLooping]);

  const onPlay = () => {
    if (!userId) {
      toast.info("You need to sign in to use this feature");
      return;
    }

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

  const onValueChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    audioRef.current!.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration || 0);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  return (
    <div className="flex flex-col rounded-lg text-sm">
      {track?.src && (
        <audio
          ref={audioRef}
          src={track.src}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs text-zinc-400">{formatTime(currentTime)}</span>

        <Slider
          value={[currentTime]}
          onValueChange={onValueChange}
          min={0}
          max={duration}
          step={0.1}
          className="w-full"
          trackClassName="bg-primary/20"
          noThumb
        />

        <span className="text-right text-xs text-zinc-400">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={onPlay}
            variant="outline"
            size="sm"
            className="hover:text-primary border-primary/20 bg-card text-sm"
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Button
            onClick={() => setIsLooping((prev) => !prev)}
            variant="outline"
            size="sm"
            className={cn(
              "hover:text-primary border-primary/20 bg-card text-sm",
              {
                "bg-primary hover:bg-initial text-white hover:text-white":
                  isLooping,
              },
            )}
          >
            <Repeat />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 size={18} className="stroke-primary/80" />
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            min={0}
            max={1}
            step={0.01}
            className="w-24"
            trackClassName="bg-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

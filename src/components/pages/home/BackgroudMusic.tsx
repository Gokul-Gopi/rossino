import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useState } from "react";

export const tracks = [
  {
    label: "Track 01",
    src: "/audios/track-01.mp3",
  },
  {
    label: "Track 02",
    src: "/audios/track-02.mp3",
  },
  {
    label: "Track 03",
    src: "/audios/track-03.mp3",
  },
  {
    label: "Track 04",
    src: "/audios/track-04.mp3",
  },
  {
    label: "Track 05",
    src: "/audios/track-05.mp3",
  },
  {
    label: "Track 06",
    src: "/audios/track-06.mp3",
  },
];

const BackgroudMusic = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  return (
    <div>
      <Select value={selectedTrack || ""} onValueChange={setSelectedTrack}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a track" />
        </SelectTrigger>

        <SelectContent className="bg-card">
          {tracks.map((track) => (
            <SelectItem key={track.label} value={track.src}>
              {track.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <audio
        src={selectedTrack!}
        controls
        autoPlay
        onEnded={() => setSelectedTrack(null)}
      />
    </div>
  );
};

export default BackgroudMusic;

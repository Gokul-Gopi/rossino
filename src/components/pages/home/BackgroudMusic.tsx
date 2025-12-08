import { Select } from "@/components/ui/Select";
import { useState } from "react";
import MusicPlayer from "./MusicPlayer";
import { Track } from "@/types";

export const tracks = [
  {
    id: "1",
    label: "Track 01",
    src: "/audios/track-01.mp3",
  },
  {
    id: "2",
    label: "Track 02",
    src: "/audios/track-02.mp3",
  },
  {
    id: "3",
    label: "Track 03",
    src: "/audios/track-03.mp3",
  },
  {
    id: "4",
    label: "Track 04",
    src: "/audios/track-04.mp3",
  },
  {
    id: "5",
    label: "Track 05",
    src: "/audios/track-05.mp3",
  },
  {
    id: "6",
    label: "Track 06",
    src: "/audios/track-06.mp3",
  },
];

const BackgroudMusic = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const onTrackSelect = (id: string) => {
    const track = tracks.find((t) => t.id === id);
    if (track) setSelectedTrack(track);
  };

  return (
    <div>
      <Select
        value={selectedTrack?.src}
        onValueChange={onTrackSelect}
        data={tracks.map((track) => ({
          label: track.label,
          value: track.src,
        }))}
        placeholder="Select a track"
        className="mt-4 mb-8 w-full"
      />

      <MusicPlayer track={selectedTrack} />
    </div>
  );
};

export default BackgroudMusic;

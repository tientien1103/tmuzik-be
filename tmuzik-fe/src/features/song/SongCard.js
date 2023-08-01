import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "../../components/PlayPause";
import { playPause, setActiveSong } from "../player/playerSlice";
import { record } from "../user-history/userHistorySlice";
import SongReaction from "./SongReaction";
import useAuth from "../../hooks/useAuth";

const SongCard = ({ songId, song, i, isPlaying, activeSong, songs }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(
      record({
        songId: song._id,
        userId: user._id,
        data: "play song once",
        action: "playSong",
      })
    );
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 bg-black/5 bg-opacity-10 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.images?.coverart}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate capitalize">
          {songId ? (
            <Link to={`/songs/${songId}`}>{song.title}</Link>
          ) : (
            <Link to={`/songs/${songId}`}>{song.title}</Link>
          )}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
      <SongReaction song={song} songId={songId} />
    </div>
  );
};

export default SongCard;

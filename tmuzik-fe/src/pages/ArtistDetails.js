import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DetailsHeader from "../components/DetailsHeader";
import RelatedSongs from "../components/RelatedSongs";
import {
  getSingleArtist,
  getSongsByArtist,
} from "../features/artist/artistSlice";
import { setActiveSong, playPause } from "../features/player/playerSlice";

const ArtistDetails = () => {
  const [page, setPage] = useState(1);
  const { artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { artist, songs } = useSelector((state) => state.artist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleArtist({ artistId }));
  }, [dispatch, artistId]);
  useEffect(() => {
    dispatch(getSongsByArtist({ page, artistId }));
  }, [dispatch, page, artistId]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artist={artist} />

      <RelatedSongs
        artist={artist}
        songs={songs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;

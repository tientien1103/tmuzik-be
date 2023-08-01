import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { sendSongReaction } from "../song/songSlice";
import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const SongReaction = ({ song, songId }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { songsById } = useSelector((state) => state.song);

  const handleClick = (emoji) => {
    dispatch(sendSongReaction({ songId, emoji }));
  };
  return (
    <div className="flex flex-row justify-end">
      <IconButton onClick={() => handleClick("like")}>
        <FavoriteIcon sx={{ fontSize: 25, color: "white" }} />
      </IconButton>
      <p variant="h6" className="mr-1 mt-2 text-white">
        {songsById[song._id]?.reactions?.data?.like}
      </p>
    </div>
  );
};

export default SongReaction;

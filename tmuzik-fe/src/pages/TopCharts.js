import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCard from "../features/song/SongCard";
import { getTopChart } from "../features/top-chart/topChartSlice";

const TopCharts = () => {
  const [page, setPage] = useState(1);

  const { songs } = useSelector((state) => state.topChart);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopChart({ page }));
  }, [dispatch, page]);

  return (
    <div className="flex flex-col items-center mb-24">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Charts
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {songs.map((song, i) => (
          <div key={song.key} className="flex flex-row items-center">
            <h3 className="lg:font-bold xs:hidden text-[100px] text-[#4c426e]">
              {i + 1}
            </h3>
            <SongCard
              songId={song._id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              songs={songs}
              i={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCharts;

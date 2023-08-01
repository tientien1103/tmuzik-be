import React, { useEffect, useState } from "react";
import SongCard from "../features/song/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../features/song/songSlice";
import SearchInput from "../components/SearchInput";
import TopPlay from "../components/TopPlay";

const HomePage = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);

  const { songs, totalSongs, totalPages } = useSelector((state) => state.song);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <div className="flex flex-col mb-24">
      <div className="flex lg:flex-row md:flex-col-reverse xs:flex-col-reverse">
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-center lg:gap-[450px] items-center lg:flex-row-reverse xs:gap-4 md:flex-row-reverse md:gap-[170px] xs:flex-col mt-4 mb-10">
            <SearchInput handleSubmit={handleSubmit} />
            <h2 className="font-bold text-3xl text-white">Discover</h2>
          </div>

          {!songs.length && (
            <h2 className="text-white text-lg font-semibold">{`No match found for "${filterName}"`}</h2>
          )}

          <div className="flex flex-wrap md:w-[800px] lg:w-[1000px] justify-center gap-8">
            {songs?.map((song, i) => (
              <SongCard
                key={song.key}
                songId={song._id}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                songs={songs}
              />
            ))}
          </div>
        </div>
        <div className="xl:sticky lg:w-[500px] relative top-0 h-fit lg:mt-5">
          <TopPlay />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

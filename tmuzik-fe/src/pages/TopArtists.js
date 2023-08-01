import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArtistCard from "../components/ArtistCard";
import { getArtists } from "../features/artist/artistSlice";
import SearchInput from "../components/SearchInput";

const TopArtists = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { artists } = useSelector((state) => state.artist);

  useEffect(() => {
    dispatch(getArtists({ filterName, page }));
  }, [dispatch, filterName, page]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top artists
      </h2>
      <SearchInput handleSubmit={handleSubmit} />

      {!artists.length && (
        <h2 className="text-white text-lg font-semibold mt-24">{`No match found for "${filterName}"`}</h2>
      )}

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {artists?.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;

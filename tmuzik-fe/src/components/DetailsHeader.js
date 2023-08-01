import React from "react";
import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artist, song }) => (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-[#4c426e] sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center">
      <img
        alt="profile"
        src={artistId ? artist?.imageUrl : song?.images?.coverart}
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />

      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artist?.name : song?.title}
        </p>
        {!artistId && (
          <Link to={`/artists/${song?.artists?.adamid}`}>
            <p className="text-base text-white mt-2">{song?.subtitle}</p>
          </Link>
        )}
      </div>
    </div>

    <div className="w-full sm:h-44 h-24" />
  </div>
);

export default DetailsHeader;

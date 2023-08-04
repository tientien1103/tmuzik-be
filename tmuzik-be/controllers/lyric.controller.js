const Lyric = require("../models/Lyric");
const Song = require("../models/Song");
const mongoose = require("mongoose");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");

const lyricController = {};

lyricController.getLyricOfSong = catchAsync(async (req, res, next) => {
  const songId = req.params.id;

  let song = await Song.findById(songId).populate("lyric");
  if (!song) {
    throw new AppError(400, "Song not found", "Get lyric error");
  }

  return sendResponse(res, 200, true, { song }, null, "Get lyric successful");
});

module.exports = lyricController;

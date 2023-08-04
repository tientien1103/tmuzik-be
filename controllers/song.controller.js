const Song = require("../models/Song");
const Artist = require("../models/Artist");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");

const songController = {};

songController.getSongs = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [];
  if (filter.title) {
    filterConditions.push({
      ["title"]: { $regex: filter.title, $options: "i" },
    });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Song.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const songs = await Song.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  sendResponse(
    res,
    200,
    true,
    { songs, totalPages, count },
    null,
    "Get list song successful"
  );
});

songController.getSingleSong = catchAsync(async (req, res, next) => {
  const songId = req.params.id;

  let song = await Song.findOne({ _id: songId }).populate("lyric");
  if (!song) {
    throw new AppError(400, "Song not found", "Get single song error");
  }

  return sendResponse(res, 200, true, song, null, "Get song successful");
});

module.exports = songController;

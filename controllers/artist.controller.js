const Artist = require("../models/Artist");
const Song = require("../models/Song");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");

const artistController = {};

artistController.getArtists = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [];
  if (filter.name) {
    filterConditions.push({
      name: { $regex: filter.name, $options: "i" },
    });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Artist.countDocuments(filterCriteria);
  const totalPage = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const artists = await Artist.find(filterCriteria)
    .sort({ reactions: -1 })
    .skip(offset)
    .limit(limit);

  sendResponse(
    res,
    200,
    true,
    { artists, totalPage, count },
    null,
    "Get list artist successful"
  );
});

artistController.getSingleArtist = catchAsync(async (req, res, next) => {
  const artistId = req.params.id;

  let artist = await Artist.findOne({ adamId: artistId });
  if (!artist) {
    throw new AppError(400, "artist not found", "Get single artist error");
  }

  return sendResponse(res, 200, true, artist, null, "Get artist successful");
});

artistController.getSongsByArtist = catchAsync(async (req, res, next) => {
  const artistId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const artist = await Artist.findOne({ adamId: artistId });
  if (!artist) {
    throw new AppError(400, "Artist not found", "Get Song Error");
  }
  // const { songs } = artist;
  const count = await Song.countDocuments({
    ["artists.adamid"]: artistId,
  });
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const songs = await Song.find({ ["artists.adamid"]: artistId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { songs, totalPages, count },
    null,
    "Get songs successful"
  );
});

module.exports = artistController;

const Playlist = require("../models/Playlist");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");

const playlistController = {};

playlistController.createPlaylist = catchAsync(async (req, res, next) => {
  const { name, songs, imageUrl } = req.body;

  let playlist = await Playlist.create({
    name,
    songs: songs,
    imageUrl: imageUrl,
  });

  return sendResponse(
    res,
    200,
    true,
    playlist,
    null,
    "Create playlist successful"
  );
});

playlistController.getSinglePlaylist = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const playlistId = req.params.playlistId;

  let playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new AppError(400, "Playlist not found", "Update Playlist Error");
  }

  playlist = await playlist.populate("songs");
  return sendResponse(
    res,
    200,
    true,
    playlist,
    null,
    "Get single playlist successful"
  );
});

playlistController.getPlaylists = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;

  let { page, limit, ...filter } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const count = await Playlist.countDocuments();
  const totalPage = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let playlists = await Playlist.find()
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { playlists, totalPage, count },
    null,
    "Get playlists successful"
  );
});

module.exports = playlistController;

const UserHistory = require("../models/UserHistory");
const Song = require("../models/Song");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");

const userHistoryController = {};

userHistoryController.record = catchAsync(async (req, res, next) => {
  let { userId, data, action, songId } = req.body;

  await UserHistory.create({
    userId: userId,
    songId: songId,
    data: data,
    action: action,
  });
  const playbackCount = await UserHistory.countDocuments({
    action: "playSong",
    songId: songId,
  });

  await Song.findByIdAndUpdate(songId, { playbackCount });

  sendResponse(res, 200, true, null, null, "Record successful");
});

module.exports = userHistoryController;

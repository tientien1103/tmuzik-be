const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const Song = require("../models/Song");

const chartController = {};

chartController.getTopChart = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const count = await Song.countDocuments();
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const songs = await Song.find()
    .sort({ playbackCount: -1 })
    .skip(offset)
    .limit(limit);

  sendResponse(
    res,
    200,
    true,
    { songs, totalPages, count },
    null,
    "Get top chart successful"
  );
});

module.exports = chartController;

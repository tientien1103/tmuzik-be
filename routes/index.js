const express = require("express");
const router = express.Router();

//authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

//userApi
const userApi = require("./user.api");
router.use("/users", userApi);
module.exports = router;

//songApi
const songApi = require("./song.api");
router.use("/songs", songApi);

//artistApi
const artistApi = require("./artist.api");
router.use("/artists", artistApi);

//reactionApi
const reactionApi = require("./reaction.api");
router.use("/reactions", reactionApi);

//lyricApi
const lyricApi = require("./lyric.api");
router.use("/lyrics", lyricApi);

//chartApi
const chartApi = require("./chart.api");
router.use("/charts", chartApi);

//playlistApi
const playlistApi = require("./playlist.api");
router.use("/playlists", playlistApi);

//userHistoryApi
const userHistoryApi = require("./userHistory.api");
router.use("/histories", userHistoryApi);

module.exports = router;

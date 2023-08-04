const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validationMiddlewares");
const { param, body } = require("express-validator");
const authentication = require("../middlewares/authentication");
const playlistController = require("../controllers/playlist.controller");

/**
 * /**
 * @route POST /playlists
 * @description Create new playlist
 * @body {name, songs}
 * @access Login required
 */
router.post(
  "/",
  authentication.loginRequired,
  playlistController.createPlaylist
);

/**
 * @route GET /playlists/:playlistId
 * @description Get songs of a single playlist
 * @access Login required
 */
router.get(
  "/:playlistId",
  authentication.loginRequired,
  validators.validate([
    param("playlistId").exists().isString().custom(validators.checkObjectId),
  ]),
  playlistController.getSinglePlaylist
);

/**
 * @route GET /playlists
 * @description Get playlists
 * @access Login required
 */
router.get("/", authentication.loginRequired, playlistController.getPlaylists);

module.exports = router;

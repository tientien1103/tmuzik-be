const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validationMiddlewares");
const { param, body } = require("express-validator");
const authentication = require("../middlewares/authentication");
const playlistController = require("../controllers/playlist.controller");

/**
 * @route POST /playlists
 * @description Create new playlist
 * @body {name, songs}
 * @access Public
 */
router.post(
  "/",
  playlistController.createPlaylist
);

/**
 * @route GET /playlists/:playlistId
 * @description Get songs of a single playlist
 * @access Public
 */
router.get(
  "/:playlistId",
  validators.validate([
    param("playlistId").exists().isString().custom(validators.checkObjectId),
  ]),
  playlistController.getSinglePlaylist
);

/**
 * @route GET /playlists
 * @description Get playlists
 * @access Public
 */
router.get("/", playlistController.getPlaylists);

module.exports = router;

const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validationMiddlewares");
const { param } = require("express-validator");
const authentication = require("../middlewares/authentication");
const lyricController = require("../controllers/lyric.controller");

/**
 * @route GET /lyrics/songs/:id
 * @description Get lyric for a song
 * @access Login required
 */
router.get(
  "/songs/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  lyricController.getLyricOfSong
);

module.exports = router;

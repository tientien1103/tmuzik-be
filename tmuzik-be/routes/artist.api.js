const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artist.controller");
const validators = require("../middlewares/validationMiddlewares");
const authentication = require("../middlewares/authentication");
const { param } = require("express-validator");

/**
 * @route GET /artists?page=1&limit=10
 * @description Get all artist can see with pagination
 * @access Login required
 */
router.get("/", authentication.loginRequired, artistController.getArtists);

/**
 * @route GET /artists/:id
 * @description Get single artist
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  artistController.getSingleArtist
);

/**
 * @route GET /artists/:id/songs
 * @description Get songs of a artist
 * @access Login required
 */
router.get(
  "/:id/songs",
  authentication.loginRequired,
  artistController.getSongsByArtist
);

module.exports = router;

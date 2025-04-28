const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artist.controller");
const validators = require("../middlewares/validationMiddlewares");
const authentication = require("../middlewares/authentication");
const { param } = require("express-validator");

/**
 * @route GET /artists?page=1&limit=10
 * @description Get all artist can see with pagination
 * @access Public
 */
router.get("/", artistController.getArtists);

/**
 * @route GET /artists/:id
 * @description Get single artist
 * @access Public
 */
router.get(
  "/:id",
  artistController.getSingleArtist
);

/**
 * @route GET /artists/:id/songs
 * @description Get songs of a artist
 * @access Public
 */
router.get(
  "/:id/songs",
  artistController.getSongsByArtist
);

module.exports = router;

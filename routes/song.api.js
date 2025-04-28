const express = require("express");
const router = express.Router();
const songController = require("../controllers/song.controller");
const validators = require("../middlewares/validationMiddlewares");
const userSchema = require("../validations/userValidation");
const authentication = require("../middlewares/authentication");
const { param } = require("express-validator");

/**
 *@route GET /songs?page=1&limit=10
 * @description Get all song can see with pagination
 * @access Public
 */
router.get("/", songController.getSongs);

/**
 * @route GET /songs/:id
 * @description Get single artist
 * @access Public
 */
router.get(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  songController.getSingleSong
);

module.exports = router;

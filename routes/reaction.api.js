const express = require("express");
const reactionController = require("../controllers/reaction.controller");
const validators = require("../middlewares/validationMiddlewares");
const { param, body } = require("express-validator");
const authentication = require("../middlewares/authentication");

const router = express.Router();

/**
 * @route POST /reactions
 * @description Save a reaction to song
 * @body {targetId, emoji: "like", "dislike"}
 * @access Login required
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("targetId", "Invalid targetId")
      .exists()
      .custom(validators.checkObjectId),
    body("emoji", "Invalid emoji").exists().isIn(["like"]),
  ]),
  reactionController.saveReaction
);

module.exports = router;

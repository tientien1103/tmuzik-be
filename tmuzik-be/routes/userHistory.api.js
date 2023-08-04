const express = require("express");
const router = express.Router();
const userHistoryController = require("../controllers/userHistory.controller");

/**
 * @route POST /histories
 * @description record activities of user
 * @body {userId, songId, data, action}
 * @access Public
 */
router.post("/", userHistoryController.record);

module.exports = router;

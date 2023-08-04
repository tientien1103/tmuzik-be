const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const chartController = require("../controllers/chart.controller");

/**
 *@route GET /top-chart?page=1&limit=10
 * @description Get all top song can see with pagination
 * @access Login required
 */
router.get("/", authentication.loginRequired, chartController.getTopChart);

module.exports = router;

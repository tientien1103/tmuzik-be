const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validators = require("../middlewares/validationMiddlewares");
const authSchema = require("../validations/authValidation");

/**
 * @route POST auth/login
 * @description Log in with email and password
 * @body {email, password}
 * @access Public
 */
router.post(
  "/login",
  validators.validateYup(authSchema),
  authController.loginWithEmail
);

module.exports = router;

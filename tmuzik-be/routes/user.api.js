const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validators = require("../middlewares/validationMiddlewares");
const userSchema = require("../validations/userValidation");
const authentication = require("../middlewares/authentication");
const { param } = require("express-validator"); // nếu bị lỗi thì thêm body vào

/**
 * @route POST /users
 * @description Register new user
 * @body {name, email, password}
 * @access Public
 */
router.post("/", validators.validateYup(userSchema), userController.register);

/**
 * @route GET /users?page=1&limit=10
 * @description Get users with pagination
 * @access Login required
 */
router.get("/", authentication.loginRequired, userController.getUsers);

/**
 * @route GET /users/me
 * @description Get current users info
 * @access Login required
 */
router.get("/me", authentication.loginRequired, userController.getCurrentUser);

/**
 * @route GET /users/:id
 * @description Get a user profile
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  userController.getSingleUser
);

/**
 * @route PUT /users/:id
 * @description Update user profile
 * @body {name, avatarUrl}
 * @access Login required
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  userController.updateProfile
);

module.exports = router;

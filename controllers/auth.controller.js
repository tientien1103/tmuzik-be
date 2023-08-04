const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const User = require("../models/User");
const UserHistory = require("../models/UserHistory");
const bcrypt = require("bcryptjs");

const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  // get data from request
  const { email, password } = req.body;

  // validation
  const user = await User.findOne({ email }, "+password");
  if (!user) {
    throw new AppError(
      400,
      "There is no Tmuzik account associated with this email address",
      "Login Error"
    );
  }

  // proccess
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Wrong password", "Login Error");
  } else {
    await UserHistory.create({
      userId: user._id,
      data: "User Login",
      action: "login",
    });
  }

  const accessToken = await user.generateToken();

  // response
  sendResponse(res, 200, true, { user, accessToken }, null, "Login successful");
});

module.exports = authController;

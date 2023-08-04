const { sendResponse } = require("../helpers/utils.js");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const validators = {};

validators.validateYup = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body);
    next();
  } catch (error) {
    next(error);
  }
};

validators.validate = (validationArray) => async (req, res, next) => {
  console.log(validationArray);
  await Promise.all(validationArray.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const message = errors
    .array()
    .map((error) => error.msg)
    .join(" & ");

  return sendResponse(res, 422, false, null, { message }, "Validation Error");
};

validators.checkObjectId = (paramId) => {
  if (!mongoose.Types.ObjectId.isValid(paramId)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
};

module.exports = validators;

const Reaction = require("../models/Reaction");
const Song = require("../models/Reaction");
const { sendResponse, AppError, catchAsync } = require("../helpers/utils");
const mongoose = require("mongoose");

const reactionController = {};

const calculateReactions = async (targetId, targetType) => {
  const stats = await Reaction.aggregate([
    {
      $match: { targetId: new mongoose.Types.ObjectId(targetId) },
    },

    // stage
    {
      $group: {
        _id: "$targetId",
        like: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "like"] }, 1, 0],
          },
        },
      },
    },
  ]);

  let reactions = {
    like: (stats[0] && stats[0].like) || 0,
  };
  await mongoose.model(targetType).findByIdAndUpdate(targetId, { reactions });
  return reactions;
};

reactionController.saveReaction = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { targetType, targetId, emoji } = req.body;

  const targetObject = await mongoose.model(targetType).findById(targetId);
  if (!targetObject) {
    throw new AppError(400, `${targetType} not found`, "Create reaction error");
  }

  // Find the reaction if exists
  let reaction = await Reaction.findOne({
    targetType,
    targetId,
    author: currentUserId,
  });
  // If there is no reaction in the DB, Create the new one
  if (!reaction) {
    reaction = await Reaction.create({
      targetType,
      targetId,
      author: currentUserId,
      emoji,
    });
  } else {
    // If there is a previous reaction in the DB -> compare the emojis
    if (reaction.emoji === emoji) {
      // If they are the same -> delete reaction
      await reaction.deleteOne();
    } else {
      // If they are different -> update reaction
      reaction.emoji = emoji;
      await reaction.save();
    }
  }

  const reactions = await calculateReactions(targetId, targetType);

  return sendResponse(
    res,
    200,
    true,
    reactions,
    null,
    "Save reaction successful"
  );
});

module.exports = reactionController;

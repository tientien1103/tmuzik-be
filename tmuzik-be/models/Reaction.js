const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const targetTypeEnum = ["song", "artist"];
const emojiEnum = ["like"];

const reactionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    targetType: { type: String, required: true, enum: targetTypeEnum },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "targetType", //reference tùy vào giá trị targetType
    },
    emoji: {
      type: String,
      required: true,
      enum: emojiEnum,
    },
  },
  { timestamps: true }
);

const Reaction = mongoose.model("reaction", reactionSchema);
module.exports = Reaction;

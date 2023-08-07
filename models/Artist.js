const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: false, default: "" },
    adamId: { type: String, required: true },
    reactions: {
      like: { type: Number, default: 0 },
    },
    isLiked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

const Artist = mongoose.model("artist", artistSchema);
module.exports = Artist;

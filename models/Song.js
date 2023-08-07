const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: { type: String, required: true },
    lyric: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "lyrics",
    },
    reactions: {
      like: { type: Number, default: 0 },
    },
    playbackCount: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }, 
  },
  { timestamps: true }
);

const Song = mongoose.model("song", songSchema);
module.exports = Song;

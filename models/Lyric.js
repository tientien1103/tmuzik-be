const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lyricSchema = new Schema(
  {
    name: { type: String, required: true },
    lines: [{ type: String, required: true }],

    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

const Lyric = mongoose.model("lyrics", lyricSchema);
module.exports = Lyric;

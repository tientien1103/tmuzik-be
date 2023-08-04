const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    songs: [{ type: Schema.Types.ObjectId, required: false, ref: "song" }],
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

const Playlist = mongoose.model("playlist", playlistSchema);
module.exports = Playlist;

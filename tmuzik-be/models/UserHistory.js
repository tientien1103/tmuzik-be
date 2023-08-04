const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionEnum = [
  "login",
  "logout",
  "playSong",
  "playPlaylist",
  "createPlaylist",
  "deletePlaylist",
];

const userHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    songId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "song",
    },
    playlistId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "playlist",
    },
    data: { type: Object, required: true, default: "" },
    action: { type: String, required: true, enum: actionEnum },
  },
  { timestamps: true }
);

const UserHistory = mongoose.model("UserHistory", userHistorySchema);
module.exports = UserHistory;

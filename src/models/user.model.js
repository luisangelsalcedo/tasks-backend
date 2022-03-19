import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      validate: {
        validator: pass => pass.length > 6,
        message: "Must be longer than 6 character",
      },
    },
    is_google_log: { type: Boolean, default: false },
    profileObj: { type: Object, default: {} },
  },
  { versionKey: false, timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;

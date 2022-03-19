import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: String,
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    complete: {
      type: Boolean,
      default: false,
    },
    assigneds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;

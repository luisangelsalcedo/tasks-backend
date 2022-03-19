import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    title: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    guests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const boardModel = mongoose.model("Board", boardSchema);

export default boardModel;

import mongoose from "mongoose";

(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
})();

mongoose.connection.once("open", () => console.log("dataBase runing"));
mongoose.connection.on("error", err => console.error(err));

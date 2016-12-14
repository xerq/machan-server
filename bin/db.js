import mongoose from "mongoose";

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost:27017/machan");

mongoose.connection.on("error", () => {
    throw new Error("Couldn't connect to the mongo database");
});

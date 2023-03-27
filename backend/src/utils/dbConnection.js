import mongoose from "mongoose";
import "dotenv/config";
import { dbSetting } from "./dbSettings";

export const connect = async () => {
  const env = process.env.NODE_ENV || "test";
  const mongoString = dbSetting[env].url;
  console.log(mongoString);
  await mongoose.connect(mongoString);
  const database = mongoose.connection;
  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};

// Remove and close the database and server.
export const close = async () => {
  await mongoose.disconnect();
  //   await mongoServer.stop();
  console.log("Connection closed");
};

// Remove all data from collections
export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    collections[key].deleteMany({}).then(() => console.log("Data deleted"));
  }
  // console.log("USERS", await User.find({}));
  // console.log("EXPENSES", await Expense.find({}));
};

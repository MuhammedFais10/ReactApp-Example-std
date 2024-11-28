import mongoose from "mongoose";
import dotenv from "dotenv";
import { cardData } from "../../data.js";
import { DataModel } from "../model/datamodel.js";
import { userModel } from "../model/userModel.js";
import { sample_users } from "../../data.js";

import bcrypt from "bcrypt";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/data_DB";
const PASSWORD_HASH_SALT_ROUNDS = 10;

export const dbconnect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("Connected successfully to MongoDB");
    await seedData();
    await seedUsers();
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

async function seedUsers() {
  if (!sample_users || sample_users.length === 0) {
    console.log("No sample users provided. Skipping user seeding.");
    return;
  }

  const usersCount = await userModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users seed is already done!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await userModel.create(user);
  }

  console.log("Users seed is done!");
}

async function seedData() {
  try {
    const dataCount = await DataModel.countDocuments();
    if (dataCount > 0) {
      console.log("Data seed is already done!");
      return;
    }
    await DataModel.insertMany(cardData);
    console.log("Data seed is done!");
  } catch (error) {
    console.error("Error during data seeding:", error.message);
  }
}

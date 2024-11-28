import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel.js";

const router = express.Router();
const PASSWORD_HASH_SALT_ROUNDS = 10;

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send({ message: "User already exists, please login!" });
    }

    // Ensure password is provided
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    // Create a new user object
    const newUser = new userModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT with the new user's ID
    const result = await userModel.create(newUser);
    res.send(generateTokenResponse(result));
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
// Login route to authenticate user and generate a JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenResponse(user));
    return;
  }
  res.status(400).send("Username or Password is invalid");
});

const generateTokenResponse = (user) => {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is in .env file
      {
        expiresIn: "30d",
      }
    );
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  } catch (err) {
    console.error("Error generating token:", err.message);
    throw new Error("Token generation failed");
  }
};

export default router;

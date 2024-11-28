import express from "express";
import { DataModel } from "../model/datamodel.js";

const router = express.Router();

router.get("/data", async (req, res) => {
  try {
    const datas = await DataModel.find({});
    res.send(datas);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data." });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { title, text, imgSrc } = req.body; // Get data from the request body

//     if (!title || !text || !imgSrc) {
//       return res.status(400).send({ error: "All fields are required" });
//     }

//     // Create and save the new data
//     const newData = new DataModel({ title, text, imgSrc });
//     await newData.save();

//     // Send a success response with the created data
//     res.status(201).send(newData);
//   } catch (error) {
//     console.error("Error creating data:", error);
//     res.status(500).send({ error: "Failed to create data." });
//   }
// });

export default router;

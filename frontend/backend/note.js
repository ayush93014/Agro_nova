// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory storage
let farmers = [];
let tips = [
  { id: 1, title: "Use crop rotation", content: "Rotate crops to improve soil health." },
  { id: 2, title: "Save water", content: "Use drip irrigation instead of flooding." },
];
let progress = {}; // farmerId -> challenges completed

// 1. Register a new farmer
app.post("/farmers", (req, res) => {
  const { name, location } = req.body;
  const newFarmer = { id: farmers.length + 1, name, location };
  farmers.push(newFarmer);
  progress[newFarmer.id] = [];
  res.status(201).json(newFarmer);
});

// 2. Get all farmers
app.get("/farmers", (req, res) => {
  res.json(farmers);
});

// 3. Get sustainable farming tips
app.get("/tips", (req, res) => {
  res.json(tips);
});

// 4. Add a new tip (admin use)
app.post("/tips", (req, res) => {
  const { title, content } = req.body;
  const newTip = { id: tips.length + 1, title, content };
  tips.push(newTip);
  res.status(201).json(newTip);
});

// 5. Track farmer challenge completion
app.post("/farmers/:id/progress", (req, res) => {
  const farmerId = parseInt(req.params.id);
  const { challenge } = req.body;

  if (!progress[farmerId]) return res.status(404).json({ error: "Farmer not found" });

  progress[farmerId].push({ challenge, date: new Date() });
  res.json({ message: "Progress updated", progress: progress[farmerId] });
});

// 6. Get progress for a farmer
app.get("/farmers/:id/progress", (req, res) => {
  const farmerId = parseInt(req.params.id);
  if (!progress[farmerId]) return res.status(404).json({ error: "Farmer not found" });
  res.json(progress[farmerId]);
});

app.listen(PORT, () => {
  console.log(`✅ FarmerHelp backend running on http://localhost:${PORT}`);
});
 
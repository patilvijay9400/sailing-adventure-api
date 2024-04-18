const express = require("express");
const router = express.Router();
const database = require("../db/database"); // Import the database connection

// GET all boats
router.get("/", (req, res) => {
  const query = "SELECT * FROM Boats";
  database.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching boats:", err);
      res.status(500).json({ error: "Failed to fetch boats" });
      return;
    }
    res.json(results);
  });
});

// POST a new boat
router.post("/", (req, res) => {
  const { B_name, B_type } = req.body;
  if (!B_name || !B_type) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const query = "INSERT INTO Boats (B_name, B_type) VALUES (?, ?)";
  database.query(query, [B_name, B_type], (err, result) => {
    if (err) {
      console.error("Error adding boat:", err);
      res.status(500).json({ error: "Failed to add boat" });
      return;
    }
    res.json({ message: "Boat added successfully", id: result.insertId });
  });
});

// PUT (update) an existing boat
router.put("/:id", (req, res) => {
  const boatId = req.params.id;
  const { B_name, B_type } = req.body;
  const query = "UPDATE Boats SET B_name = ?, B_type = ? WHERE B_Id = ?";
  database.query(query, [B_name, B_type, boatId], (err, result) => {
    if (err) {
      console.error("Error updating boat:", err);
      res.status(500).json({ error: "Failed to update boat" });
      return;
    }
    res.json({ message: "Boat updated successfully", id: boatId });
  });
});

// DELETE a boat by ID
router.delete("/:id", (req, res) => {
  const boatId = req.params.id;
  const query = "DELETE FROM Boats WHERE B_Id = ?";
  database.query(query, [boatId], (err, result) => {
    if (err) {
      console.error("Error deleting boat:", err);
      res.status(500).json({ error: "Failed to delete boat" });
      return;
    }
    res.json({ message: "Boat deleted successfully", id: boatId });
  });
});

module.exports = router;

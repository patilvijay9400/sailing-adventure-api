const express = require("express");
const router = express.Router();
const database = require("../db/database");

// GET all reservations
router.get("/", (req, res) => {
  const query = `
    SELECT R.*, S.S_name AS sailor_name, B.B_name AS boat_name
    FROM Reserves R
    JOIN Sailors S ON R.S_Id = S.S_Id
    JOIN Boats B ON R.B_Id = B.B_Id
  `;
  database.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      res.status(500).json({ error: "Failed to fetch reservations" });
      return;
    }
    res.json(results);
  });
});

// POST a new reservation
router.post("/", (req, res) => {
  const { S_Id, B_Id, Day } = req.body;
  if (!S_Id || !B_Id || !Day) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const query = "INSERT INTO Reserves (S_Id, B_Id, Day) VALUES (?, ?, ?)";
  database.query(query, [S_Id, B_Id, Day], (err, result) => {
    if (err) {
      console.error("Error adding reservation:", err);
      res.status(500).json({ error: "Failed to add reservation" });
      return;
    }
    res.json({
      message: "Reservation added successfully",
      id: result.insertId,
    });
  });
});

// DELETE a reservation by composite key (S_Id, B_Id, Day)
router.delete("/:sailorId/:boatId/:day", (req, res) => {
  const sailorId = req.params.sailorId;
  const boatId = req.params.boatId;
  const day = req.params.day;
  const query = "DELETE FROM Reserves WHERE S_Id = ? AND B_Id = ? AND Day = ?";
  database.query(query, [sailorId, boatId, day], (err, result) => {
    if (err) {
      console.error("Error deleting reservation:", err);
      res.status(500).json({ error: "Failed to delete reservation" });
      return;
    }
    res.json({
      message: "Reservation deleted successfully",
      sailorId,
      boatId,
      day,
    });
  });
});

module.exports = router;

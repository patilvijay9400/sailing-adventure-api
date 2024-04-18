const express = require('express');
const router = express.Router();
const database = require('../db/database');

// GET all sailors
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Sailors';
    database.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching sailors:', err);
        res.status(500).json({ error: 'Failed to fetch sailors' });
        return;
      }
      res.json(results);
    });
  });
  
  // GET a single sailor by ID
  router.get('/:id', (req, res) => {
    const sailorId = req.params.id;
    const query = 'SELECT * FROM Sailors WHERE S_Id = ?';
    database.query(query, [sailorId], (err, results) => {
      if (err) {
        console.error('Error fetching sailor:', err);
        res.status(500).json({ error: 'Failed to fetch sailor' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Sailor not found' });
        return;
      }
      res.json(results[0]);
    });
  });
  
  // POST a new sailor
  router.post('/', (req, res) => {
      const { S_name, B_date, Rate } = req.body;
      if (!S_name || !B_date || !Rate) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
    const query = 'INSERT INTO Sailors (S_name, B_date, Rate) VALUES (?, ?, ?)';
    database.query(query, [S_name, B_date, Rate], (err, result) => {
      if (err) {
        console.error('Error adding sailor:', err);
        res.status(500).json({ error: 'Failed to add sailor' });
        return;
      }
      res.json({ message: 'Sailor added successfully', id: result.insertId });
    });
  });
  
  // PUT (update) an existing sailor
  router.put('/:id', (req, res) => {
    const sailorId = req.params.id;
    const { S_name, B_date, Rate } = req.body;
    const query = 'UPDATE Sailors SET S_name = ?, B_date = ?, Rate = ? WHERE S_Id = ?';
    database.query(query, [S_name, B_date, Rate, sailorId], (err, result) => {
      if (err) {
        console.error('Error updating sailor:', err);
        res.status(500).json({ error: 'Failed to update sailor' });
        return;
      }
      res.json({ message: 'Sailor updated successfully', id: sailorId });
    });
  });
  
  // DELETE a sailor by ID
  router.delete('/:id', (req, res) => {
    const sailorId = req.params.id;
    const query = 'DELETE FROM Sailors WHERE S_Id = ?';
    database.query(query, [sailorId], (err, result) => {
      if (err) {
        console.error('Error deleting sailor:', err);
        res.status(500).json({ error: 'Failed to delete sailor' });
        return;
      }
      res.json({ message: 'Sailor deleted successfully', id: sailorId });
    });
  });
  


module.exports = router;

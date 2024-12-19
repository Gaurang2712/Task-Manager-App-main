import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tasks_db",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// API Endpoints
// Get all tasks
app.get("/tasks", (req, res) => {
    const query = "SELECT * FROM tasks";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Add a new task
app.post("/tasks", (req, res) => {
    const { text, priority, date } = req.body;
    const query = "INSERT INTO tasks (text, priority, date) VALUES (?, ?, ?)";
    db.query(query, [text, priority, date], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Task added successfully", taskId: results.insertId });
        }
    });
});

// Edit a task
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const query = "UPDATE tasks SET text = ? WHERE id = ?";
    db.query(query, [text, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Task updated successfully" });
        }
    });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Task deleted successfully" });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

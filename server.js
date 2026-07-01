require("dotenv").config();

const express = require("express");
const path = require("path");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// CREATE
app.post("/api/notes", async (req, res) => {
    const { text } = req.body;

    const result = await pool.query(
        "INSERT INTO notes(text) VALUES($1) RETURNING *",
        [text]
    );

    res.json(result.rows[0]);
})

// READ
app.get("/api/notes", async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM notes ORDER BY id DESC"
    );

    res.json(result.rows);
})

// UPDATE
app.put("/api/notes/:id", async (req, res) => {
    const { text } = req.body;

    const result = await pool.query(
        "UPDATE notes SET text = $1 WHERE id = $2 RETURNING *",
        [text, req.params.id]
    );

    res.json(result.rows[0]);
});

// DELETE
app.delete("/api/notes/:id", async (req, res) => {
    await pool.query(
        "DELETE FROM notes WHERE id = $1",
        [req.params.id]
    );

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
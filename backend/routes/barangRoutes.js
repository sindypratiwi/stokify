const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM barang", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { nama, stok, harga } = req.body;
  db.query(
    "INSERT INTO barang (nama, stok, harga) VALUES (?, ?, ?)",
    [nama, stok, harga],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Barang ditambahkan", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nama, stok, harga } = req.body;
  db.query(
    "UPDATE barang SET nama=?, stok=?, harga=? WHERE id=?",
    [nama, stok, harga, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Barang diupdate" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM barang WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Barang dihapus" });
  });
});

module.exports = router;

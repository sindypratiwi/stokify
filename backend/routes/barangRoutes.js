const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE (Tambah barang)
router.post('/', (req, res) => {
  const { nama, harga, stok } = req.body;
  const sql = 'INSERT INTO barang (nama, harga, stok) VALUES (?, ?, ?)';
  db.query(sql, [nama, harga, stok], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Barang berhasil ditambahkan', id: result.insertId });
  });
});

// READ (Ambil semua barang)
router.get('/', (req, res) => {
  db.query('SELECT * FROM barang', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// UPDATE (Update barang berdasarkan id)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama, harga, stok } = req.body;
  const sql = 'UPDATE barang SET nama = ?, harga = ?, stok = ? WHERE id = ?';
  db.query(sql, [nama, harga, stok, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Barang berhasil diupdate' });
  });
});

// DELETE (Hapus barang berdasarkan id)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM barang WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Barang berhasil dihapus' });
  });
});

module.exports = router;

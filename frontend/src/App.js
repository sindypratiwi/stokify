import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [barangList, setBarangList] = useState([]);
  const [form, setForm] = useState({ nama: "", stok: "", harga: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    const res = await axios.get("http://localhost:5000/barang");
    setBarangList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/barang/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/barang", form);
    }
    setForm({ nama: "", stok: "", harga: "" });
    fetchBarang();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/barang/${id}`);
    fetchBarang();
  };

  const handleEdit = (barang) => {
    setForm({ nama: barang.nama, stok: barang.stok, harga: barang.harga });
    setEditId(barang.id);
  };

  return (
    <div className="container">
      <h2>📦 Daftar Barang</h2>

      {/* Form Tambah / Edit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nama Barang"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stok"
          value={form.stok}
          onChange={(e) => setForm({ ...form, stok: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={form.harga}
          onChange={(e) => setForm({ ...form, harga: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Tambah"}</button>
      </form>

      {/* Tabel Barang */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barangList.map((barang) => (
            <tr key={barang.id}>
              <td>{barang.nama}</td>
              <td>{barang.stok}</td>
              <td>{barang.harga}</td>
              <td>
                <button onClick={() => handleEdit(barang)}>Edit</button>
                <button onClick={() => handleDelete(barang.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

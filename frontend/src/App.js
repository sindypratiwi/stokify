import React, { useEffect, useState } from "react";

function App() {
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/barang") 
      .then(res => res.json())
      .then(data => setBarang(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Barang</h1>
      <ul>
        {barang.map((b, i) => (
          <li key={i}>
            {b.nama_barang} - Stok: {b.stok} - Harga: {b.harga}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

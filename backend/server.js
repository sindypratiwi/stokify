const express = require("express");
const cors = require("cors");
const app = express();
const barangRoutes = require("./routes/barangRoutes");

app.use(cors());
app.use(express.json());

app.use("/barang", barangRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});

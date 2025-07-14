const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/news.routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));


// ❗️Aqui precisa ser uma função (router), não undefined
app.use("/news", newsRoutes);

app.get("/", (req, res) => {
  res.send("Rilix API funcionando!");
});

module.exports = app;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");
const syncDb = require("./config/sync-db");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use(morgan("dev"));

app.use(cors());

app.use(`/api/v1`, routes);

// Testing Route
app.get("/hello/:name", async (req, res) => {
  try {
    const name = req.params.name;

    res.status(200).json(`Hello ${name}`);

  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Connect and Sync MySQL DB
syncDb(app, port);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');
const fsr = require('file-stream-rotator');

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");

//
const app = express();

let logsinfo = fsr.getStream({
  filename: "logs/data.log",
  frequency: "1h",
  max_logs: "5",
  verbose: true,
});

app.use(morgan("tiny", { stream: logsinfo }));

dotenv.config();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// setup and configs

app.use(
  cors({
    origin: "*",
  })
);

//updaing password in env

// utils

app.use(express.json());

// router exports

const proxyCheck = require("./routes/proxyCheck");
const postsApi = require("./routes/postsApi");
const profileApi = require("./routes/profileApi");
const communityApi = require("./routes/communityApi/index");
const searchApi = require("./routes/searchApi/index");
const tagsApi = require("./routes/tagsApi/index");
const reposApi = require("./routes/reposApi/index");

// routes
app.use("/", proxyCheck);
app.use("/posts", postsApi);
app.use("/profile", profileApi);
app.use("/users", require("./routes/usersApi"));
app.use("/community", communityApi);
app.use("/search", searchApi);
app.use("/tags", tagsApi);
app.use("/repos", reposApi);

app.use("/auth", require("./routes/auth"))

app.get("/test" ,(_, res) => {
  return res.json({message : "Success!!"})
})

module.exports = app;


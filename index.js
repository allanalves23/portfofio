const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use("/public", express.static("public"));

app.use("/vendor", express.static("vendor"));
app.use("/css", express.static("css"));
app.use("/img", express.static("img"));
app.use("/js", express.static("js"));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

app.route("/").get((req, res) => {
  return res.sendFile("./index.html", { root: __dirname });
});

app.get("/curriculum", (req, res) =>
  res.download("./public/pdf/Allan_Curriculo.pdf")
);

app.post("/debugTest", (req, res) => {
  const data = { ...req.body };
  return res.json(data);
});

const _PORT = process.env.PORT;

app.listen(_PORT, () => console.log(`Running at port: ${_PORT}`));

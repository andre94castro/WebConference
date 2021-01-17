require("./loader.js");
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || "8080";

const express = require("express");
const app = express();

app.use("/assets", express.static("assets"));
app.use("views", express.static("views"));

const cors = require("cors");
app.use(cors());
app.use(
    cors({
        exposedHeaders: ["Location"],
    })
);
const permitedLinker = ["localhost", "127.0.0.1"];

app.listen(port, function (err) {
    if (!err) {
        console.log("Your app is listening on " + host + " and port " + port);
    } else {
        console.log(err);
    }
});

module.exports = app;

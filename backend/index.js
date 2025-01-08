const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const indexApp = require("./server/route/index");
const multipart = require('express-multipart-file-parser');
const cloudinary = require('cloudinary').v2;
const config = require("./config/config");

mongoose.connect(config.myDb)
    .then(() => { console.log("Database Connected"); })
    .catch((error) => { console.log("Database Connection Failed", error); });

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecrete
});

app.use(multipart);
app.use(cors());
app.use('/app', indexApp);

app.listen(config.port, () => {
    console.log("Server Connected");
});

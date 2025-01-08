const express = require("express");
const adminRoute = express();
const bodyParser = require('body-parser');

adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: true }));

const Admin = require("../controller/admin");

adminRoute.post("/userRegister", Admin.userRegister);
adminRoute.get("/userList", Admin.userList);
adminRoute.delete("/userDelete/:userId", Admin.userDelete);

module.exports = adminRoute;

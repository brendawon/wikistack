const express = require("express");
const usersRouter = express.Router();
module.exports = usersRouter;

usersRouter.get("/", (req, res, next) => {
  res.send("this is the users page!");
});

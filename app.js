const express = require("express");
const morgan = require("morgan");
const main = require("./views/main");
const app = express();
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const usersRouter = require("./routes/users");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
  next();
});

app.use("/wiki", wikiRouter);
app.use("/users", usersRouter);

const init = async () => {
  await db.sync();
  // {force: true}
  // this option will drop all tables and then recreate them. So if you had rows of data in your tables, that data will be lost. This is a very good option to run once, right after a change is made to your models, and then you can remove it afterwards. If you leave it there, your database will be dropped and recreated every time your server restarts... which will happen a lot while you are actively developing!

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();

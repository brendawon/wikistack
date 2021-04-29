const express = require("express");
const morgan = require("morgan");
const main = require("./views/main");
const layout = require("./views/layout");
const { db, Page, User } = require('./models');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get("/", (req, res) => {
    res.send(layout(""));
})

const init = async () => {
    await db.sync({force: true})

    const PORT = 1337;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

init();
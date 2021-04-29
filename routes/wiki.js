const express = require("express");
const wikiRouter = express.Router();
const main = require("../views/main");
module.exports = wikiRouter;
const { Page } = require("../models");
const { addPage } = require("../views");
const wikipage = require("../views/wikipage");
// WHY DOES THIS WORK ? 
// const wikipage = require("../views/wikipage");
// BUT THIS DOESN'T WORK: const { wikipage  } = require("../views/");

wikiRouter.get("/", (req, res, next) => {
  res.send(main());
});

wikiRouter.get("/add", (req, res) => {
  res.send(addPage());
});

wikiRouter.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: {slug: req.params.slug}
    });
    res.send(wikipage(foundPage));
  } catch (error) {
    next(error);
  }
});

wikiRouter.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

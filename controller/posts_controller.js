const express = require("express");
const community = require("../model/postsDB.js");
const router = express.Router();
const request = require('request')
const cheerio = require('cheerio')

router.get("/", (req, res) => {
  res.render("homepage")
})
router.get("/articles", (req, res) => {
  community.entries.findEntries(data => {

    res.render("home", {
      data: data
    })
  });
});

router.get("/savedarticles", (req, res) => {
  community.entries.savedEntries(data => {
    res.render("savedarticles", {
      data: data
    })
  });
});

router.get("/scrape", function (req, res) {
  request("https://www.washingtonpost.com/regional/", function (error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class

    $('.headline').each(function (i, element) {
      // Save the text and href of each link enclosed in the current element
      let title = $(element).text()
      let linkRel = $(element).children().attr("href");
      let link = linkRel
      let source = "espn"


      if (title && link) {
        community.entries.createEntry(title, link, source)
      }
    })
    res.redirect("/articles")
  })
})

router.get("/articles/:id", function (req, res) {

  community.entries.viewOneEntry(req.params.id, function (data) {
    try {
      res.render("individualpost", {
        data: data,
        note: data.note
      })
    } 
    catch(err) {
      res.render("individual", {
        data: data,
      })
    }
  })



});

router.delete("/api/deletepost/:id", function (req, res) {
  community.entries.deletePost(req.params.id, function (data) {

    if (data.note[0].title !== '') {
      res.render("individualpost", {
        data: data,
        note: data.note
      })
    } else {
      res.render("individual", {
        data: data,
      })
    }
  })
})



router.post("/api/post/:id", function (req, res) {
  community.entries.createPost(req.body.title, req.body.body, req.params.id, function (data) {
    res.json(data)
  })
});

router.post("/api/save/:id", function (req, res) {
  community.entries.savePost(req.body.saved, req.params.id, function (data) {
    res.json(data)
  })
});




module.exports = router;
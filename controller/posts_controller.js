const express = require("express");
const community = require("../model/postsDB.js");
const router = express.Router();
const request = require('request')
const cheerio = require('cheerio')


router.get("/articles", (req, res) => {
  community.entries.findEntries(data => {
    // res.json(data)
    res.render("home", {
      data: data
    })
    // console.log(data)
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

router.get("/articles/:id", function(req, res) {
  
  community.entries.viewOneEntry(req.params.id, function(data) {
    res.render("individual", {
      data: data
    })
  })
    
});

router.post("/api/post_comment", (req, res) => {
  let postingTitle = req.body.postTitle
  let postingBody = req.body.postComment
  let postingUser = req.body.username
  community.entries.comment(postingUser, user => {
    if (user) {
      console.log(user)
      community.postings.addNewPost(postingTitle, postingBody, postingUser, postingUrl, communityID, data => {
        res.json(data)
      })
    } else {
      res.json("no user found")
    }
  })
})

// // If this found element had both a title and a link
// if (title && link) {
//   // Insert the data in the scrapedData db
//   db.scrapedData.insert({
//     title: title,
//     link: link
//   },
//   function(err, inserted) {
//     if (err) {
//       // Log the error if one is encountered during the query
//       console.log(err);
//     }
//     else {
//       // Otherwise, log the inserted data
//       console.log(inserted);
//     }
//   });
// }





// Export routes for server.js to use.
module.exports = router;
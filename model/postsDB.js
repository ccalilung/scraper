const mongojs = require("mongojs");
const mongoose = require("mongoose")
const db = require("./article")
const databaseUrl = "theScraper";
const collections = ["theScrapedData"];

mongoose.connect("mongodb://localhost/theScraper")

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });




let entries = {
    findEntries: function (callback) {
        db.find({}, function (error, found) {
            // Throw any errors to the console
            if (error) {
                
            }
            // If there are no errors, send the data to the browser as json
            else {
                callback(found)
                // console.log(found)
            }
        })
    },
    createEntry: (articleTitle, articleLink, articleSource) => {
        db.create({
            title: articleTitle,
            link: articleLink,
            source: articleSource
        }).then((x) => {
            // console.log(x)
        })
    },
    viewOneEntry: (id, callback) => {
        db.findOne({_id: id}, function (error, found) {
            // Throw any errors to the console
            if (error) {
                
            
            }
            // If there are no errors, send the data to the browser as json
            else {
                callback(found)
                // console.log(found)
            }})
           
            // .populate("note")
            // .then(function (dbArticle) {
                
            //     callback(dbArticle);
            // })
            // .catch(function (err) {
            //     // If an error occurred, send it to the client
            //     res.json(err);
            // });

    },

    comment: (note) => {
        db.create({

        })
    }

}




module.exports = {
    db: db,
    entries: entries


};


// module.exports = orm
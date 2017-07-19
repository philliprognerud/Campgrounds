var mongoose = ("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "clouds rest", 
            image: "https://static.pexels.com/photos/456710/pexels-photo-456710.jpeg",
            description: "blahblahblah"
        },
        {
            name: "desert messa", 
            image: "https://static.pexels.com/photos/260560/pexels-photo-260560.jpeg",
            description: "blahblahblah"
        },
        {
            name: "wooden road", 
            image: "https://static.pexels.com/photos/389945/pexels-photo-389945.jpeg",
            description: "blahblahblah"
        }
    ]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("remove campgrounds");
        
        data.forEach(function(seed){
           Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   console.log("added campground");
                   Comment.create({
                       text: "This place is great, but there's no internet!!",
                       author: "phillip"
                   }, function(err, comment){
                       if(err){
                           console.log(err);
                       } else {
                            campground.comments.push(comment);
                            campground.save(); 
                            console.log("created new comment");
                       }
                       
                   });
               }
           });
        });
    });
    
}

module.exports = seedDB;

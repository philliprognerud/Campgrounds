var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/campgrounds");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Montara", image: "http://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg"
        
//     }, function(err, campground){
//         if(err){
//             console.log("error");
//         } else {
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("error");
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log("error");
       } else {
           res.redirect("/campgrounds");
       }
    });
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started"); 
});
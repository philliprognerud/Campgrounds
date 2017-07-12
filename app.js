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
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Montara", 
//         image: "http://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg",
//         description: "This is a huge granite hill, no bathrooms with no water"
        
//     }, function(err, campground){
//         if(err){
//             console.log("error");
//         } else {
//             console.log(campground);
//         }
//     });


//Home page
app.get("/", function(req, res){
    res.render("landing")
});


//INDEX - display list of all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("error");
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});


//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var newCampground = {name: name, image: image, description: desc}
    
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log("error");
       } else {
           res.redirect("/campgrounds");
       }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });

});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started"); 
});
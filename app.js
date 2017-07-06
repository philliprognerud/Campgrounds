var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
            {name: "Salmon Creek", image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg"},
            {name: "Mtn Goat", image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf"},
            {name: "Montara", image: "http://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg"},
        ];
        
        res.render("campgrounds", {campgrounds:campgrounds});
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started"); 
});
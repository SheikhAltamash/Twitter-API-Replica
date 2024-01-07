const express = require("express");
//const { connect } = require("http2");
const app = express();
const port = 8080;
const path = require("path");
app.set("viem engine", "ejs");//for setting the view to the ejs
app.set("views", path.join(__dirname, "views"));//for setting the path of the views which is a folder called "views"
app.use(express.static(path.join(__dirname, "public")));//for setting the path of the folder public which will contain all the file for the webpage like style.css and app.js
app.use(express.urlencoded({extended: true}));//for encoding the data come from the server which can't be acceessed easily
const { v4: uuid4 } = require('uuid');//for creating new uniques id for each post
const methodOverride= require('method-override');
app.use(methodOverride("_method"));
app.get("/post", (req, res) => {
    res.render("index.ejs",{posts});
});
app.listen(port, () => {
    console.log("Listening to port 8080");
})

let posts = [
    {    id:uuid4(),
        username: "Altamash",
        content: "I love coding"
    },
     {  id:uuid4(), 
        username: "Arbab",
        content: "Hard Work is the key to Success"
    },
      { id:uuid4(), 
        username: "Aqtab",
        content: "I got selected for job"
    }
];

app.get("/post/new", (req, res) => { 
    res.render("new.ejs");
})

app.post("/post", (req,res) => {
    let { username, content } = req.body;
    let id = uuid4();
    posts.push({ username, content,id});
   res.redirect("/post");
})

app.get("/post/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
   
    res.render("show.ejs", { post });
    if (!post) {
        res.send("<h1>The id you are trying to reach is not found<h1>");
    }

});

app.patch("/post/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/post");
})

app.get("/post/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", { post });

 })

app.delete("/post/:id", (req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/post");
    
})
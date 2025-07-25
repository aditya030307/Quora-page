const express = require("express");
const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 3000;
=======
const port = process.env.PORT || 3000;
>>>>>>> 13a8009 (Fixed package.json)
const path = require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
let posts = [
    {
        id :uuidv4(),
        username : "apnaCollege",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "Aditya ",
        content : "A hard working boi"

    },
    {
        id : uuidv4(),
        username : "apnaTiwari",
        content : "coding love me"

    }
]
app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts} );
});

app.get("/posts/new",(req ,res) =>{
    res.render("new.ejs")
})

app.post("/posts" ,(req,res) =>{
    let id = uuidv4();
    let { username , content} = req.body;
    posts.push({id , username , content});
    res.redirect("/posts");
})
app.get("/posts/:id" , (req , res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" ,{post} )
   
})
app.patch("/posts/:id", (req, res) => {
    let{id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;

    console.log(post);
    res.redirect("/posts");
    })
app.get("/posts/:id/edit",(req , res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs");
})
app.delete("/posts/:id", (req,res)   => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,() =>{
    console.log(`Listening to port ${port}`)
});

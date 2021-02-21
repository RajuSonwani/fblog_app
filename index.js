const express= require("express");
const app = express();
// const path = require("path");

const blog = require("./model/pool");

const router = require("./routes/main");
app.use("/blog",router);

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.set("views",path.join(__dirname,"views"))
app.set(__dirname+ "views");
app.set("view engine","ejs");

app.get("/",async(req,res)=>{
    const articles =  await blog.find().sort({createdAt:"desc"});
    // console.log(articles);
    res.render("home", {articles:articles});
});

app.post("/",async (req,res)=>{
    let article = new blog({
        title:req.body.title,
        des:req.body.des,
        markdown:req.body.markdown
    })
    try{
        article = await article.save();
        res.redirect(`/blog/${article.slug}`)
    }catch(e){
        res.render("new", {article:article});
    }
})



app.listen(8000,()=>{
    console.log("server is running..!")
});
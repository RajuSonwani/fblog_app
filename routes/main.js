const express = require("express");
const router = express.Router();

const methodOverride = require("method-override");

const blog = require("../model/pool");

router.use(methodOverride("_method"));
router.use(express.json());
router.use(express.urlencoded({extended:false}))


router.get("/new", (req, res) => {
    res.render("new", { article: new blog });
});

router.get("/:slug", async (req, res) => {
    // console.log(req.params);
    // let article =  await blog.find({_id:req.params.id});// it gives back array of objects
    // let article = await blog.findById(req.params.id); //it will return object only of given id
    let article = await blog.findOne({slug:req.params.slug});
    // console.log(article);
    if (article == null) return res.redirect("/");
    res.render("showArticle", { article: article });
});

router.get("/edit/:id", async (req, res) => {
    let article = await blog.findById(req.params.id); //it will return object only of given id
    // console.log(article);
    if (article == null) return res.redirect("/");
    res.render("edit", { article: article });
});

router.put("/:id",async(req,res)=>{
     await blog.updateMany({_id:req.params.id},{$set:{
        title:req.body.title,
        des:req.body.des,
        markdown:req.body.markdown}
    }).then(data=>{
        // console.log(data);
        res.redirect(`/blog/${req.params.id}`)
    }).catch(e=>console.log(e))
    // console.log(article);
})

router.delete("/:id", async (req, res) => {
    await blog.findByIdAndDelete(req.params.id).then((data)=>{
        console.log(data);
        console.log("article deleted..!");
        res.redirect("/");
    }).catch((e)=>{
        console.log(e)
    })
});





module.exports = router;
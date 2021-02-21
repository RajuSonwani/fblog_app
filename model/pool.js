const { mongo } = require("mongoose")

const slugify = require("slugify");

const marked = require("marked")
const createDomPurify = require("dompurify");
const {JSDOM} = require("jsdom");
const domPurify = createDomPurify(new JSDOM().window);

const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost/rAju",{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true});


// articleSchema
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true},
    des:{
        type:String,
        required:true},
    markdown:{
        type:String,
        require:true},
    slug:{
        type:String,
        required:true,
        unique:true},
    sanitizedHtml:{
        type:String,
        required:true},
    createdAt:{
        type:Date,
        // default:()=> Date.now()
        default:Date.now}
});

articleSchema.pre("validate",function(next){
    if(this.title){
        this.slug = slugify(this.title,{
            lower:true,strict:true
        })
    }
    if(this.markdown){
        this.sanitizedHtml = domPurify.sanitize(marked(this.markdown))
    }
    
    next()
})


module.exports = mongoose.model("blog",articleSchema);
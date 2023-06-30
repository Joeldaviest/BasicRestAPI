const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const port =3000

app.listen(port,function(){
    console.log("Started Server Port: 3000")
})

mongoose.connect("mongodb://localhost:27017/wikiDB")

const schema={
    title: String,
    content: String
}

const article = mongoose.model("article",schema)


app.route("/articles")
.get(async(req,res)=>{
    try{
        var articles = await article.find()
        res.send(articles)
    }catch(err){
        console.log(err)
    }
})

.post(async(req,res)=>{
    try{
        var newArticle = new article({
            title:req.body.title,
            content: req.body.content
        })
        newArticle.save()
        res.send("Posted")
    }catch(err){
        console.log(err)
    }
})

.delete(async(req,res)=>{
    try{
        var deleteAll = await article.deleteMany()
        res.send(deleteAll)
    }catch(err){
        console.log(err)
    }
    })

app.route("/articles/:articleTitle")
.get(async(req,res)=>{
    try{
        var id = req.params.articleTitle
        var articles = await article.findOne({title:id})
        res.send(articles)
    }catch(err){
        console.log(err)
    }
})

.put(async(req,res)=>{
    try{
        var id = req.params.articleTitle
        var updateArticleFull = await article.updateOne(
            {title:id},
            {title:req.body.title,
            content:req.body.content})
        res.send(updateArticleFull)
    }catch(err){
        console.log(err)
    }
})

.patch(async(req,res)=>{
    try{
        var id = req.params.articleTitle
        var updateArticle = await article.updateOne(
            {title:id},
            {$set: req.body})
    }catch(err){
        console.log(err)
    }
})

.delete(async(req,res)=>{
    try{
        var id = req.params.articleTitle
        var deleteOne = await article.deleteOne({title:id})
        res.send(deleteOne)
    }catch(err){
        console.log(err)
    }
})

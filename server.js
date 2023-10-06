const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/Article')
const app = express();

mongoose.connect("mongodb+srv://medmedmed:0k6a8tFdkH50E8hF@cluster0.iskrghf.mongodb.net/?retryWrites=true&w=majority")
.then((res)=>{
    console.log(`Success on connection : ${res}`)

}).catch((error) =>{
    console.log(`Error on connection : ${error}`)
})


app.use(express.json())
// 0k6a8tFdkH50E8hF
// medmedmed
// mongodb+srv://medmedmed:<password>@cluster0.iskrghf.mongodb.net/?retryWrites=true&w=majority

const db_hostname = "medmedmed";
const db_username = "medmedmed";
const db_password = "0k6a8tFdkH50E8hF";


app.get('/' , (req , res)=>{
    res.send('thats my index / 00')
})


app.get('/hi' , (req , res)=>{
    hi(req, res)
})

app.get('/calculate/:number1/:number2' , (req , res)=>{
    // let numbers = "";
    // for (let index = 0; index < 100; index++) {
    //     numbers += " - "+index; 
    // }
    const number1 = Number(req.params.number1);
    const number2 = Number(req.params.number2);

     let result = number1 * number2 ;

    res.send(`Result is: ${result}`)
    
})

app.get('/calculate2' , (req , res)=>{
    console.log('body => : ', req.body.name)
    // const number1 = Number(req.body.number1);
    // const number2 = Number(req.body.number2);

    //  let result = number1 * number2 ;
     let result = null ;
    res.send(`Result is: ${result}`)
    
})

app.get('/hello' , (req , res)=>{
   res.send("<h1>Hello</h1>")
 })

app.get('/json' , (req , res)=>{
   res.json({
    "data" : "my Data"
   })
})


app.get('/numbers' , (req , res)=>{

     let numbers = "";
        for (let index = 0; index < 100; index++) {
            numbers += " - "+index; 
        }

    // res.sendFile(__dirname + "view/number.html")
    res.render("numbers.ejs" , {
        'numbers' : numbers
    })
})



app.post('/addComment' , (req , res)=>{
})


function hi(request , response){
    var result = {
        message : "message content",
        status : 200
    };

    response.send(result)
    console.log('executing hi() function');
}



// Articles
app.post('/articles/add' , async (req , res)=>{
    let title = req.body.article_title;
    let body = req.body.article_body;
    let likes = 0;

    const newAricle = new Article();
    newAricle.title = title;
    newAricle.body = body;
    newAricle.likes = likes;

    await newAricle.save();
    console.log(JSON.stringify(newAricle))
    const  notification = {
        "message" : "success",
        "status" : 200,
        "data" : newAricle,
    }

    res.json(notification)
    // res.send("success : "+ JSON.stringify(newAricle))
})
// get All
app.get('/articles' , async (req , res)=>{
    const allArticles = await Article.find();
    
    res.json(allArticles);
    // res.send("articles : "+ allArticles);
})
// get By Id
app.get('/articles/:articleId' , async (req , res)=>{
    const id = req.params.articleId
    const myArticle = await Article.findById(id);
    res.json(myArticle);
    // res.send("article ID : "+id);
})


// port
app.listen(3000 , ()=>{
    console.log("server is running on port :3000")
})



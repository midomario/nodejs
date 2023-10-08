import express, { json } from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'reactnode'  
});

app.get('/', (req , res )=> {
    res.send('this is backend server')
    // console.log(db)
})


app.get('/books', (req , res )=> {
    // res.send('this is backend server')
    const myQuery = "SELECT * FROM books";

    db.query(myQuery, function(err, data){
        if (err)  return res.json(err)
        return res.json(data)
    }) 
    // console.log(db)
})


app.get('/books/:id', (req , res )=> {
    const myQuery = "SELECT * FROM books WHERE id = ?";
    const bookId  = req.params.id

    db.query(myQuery, [bookId], function (err, data) {
        console.log("data : "+JSON.stringify(data))
        if (err)  return res.json(err)
        return res.json(data)
    }) 
    // console.log(db)
})



app.post('/books', (req, res) => {
    const myQuery = "INSERT INTO books (`title` , `desc` , `cover`) VALUES (?)" 
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(myQuery,[values] ,function (error, result){
        if (error) return res.json(error)
        return res.json(result)
    })
})


app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id
    const myQuery = "DELETE FROM books WHERE id = ?" 
     db.query(myQuery,[bookId] ,function (error, result){
        if (error) return res.json(error)
        return res.json(result)
    })

})



app.put('/books/:id', (req, res) => {
    const bookId  = req.params.id
    const myQuery = "UPDATE books SET `title` = ? , `desc`  = ? , `cover` = ? WHERE id = ? " 
    const values  =  [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]
        
     db.query(myQuery,[...values , bookId] ,function (error, result){
        if (error) return res.json(error)
        return res.json(result)
    })

})

app.listen(8800, () => {
    console.log("App is running .... OK")
})
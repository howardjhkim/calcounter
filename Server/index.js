const express = require('express');
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'dontfkwithme',
    database: 'calcountdb',
});




///////////////////////// FOODINPUT DATA ONLY ////////////////////////////////////


app.post("/create", (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const protein = req.body.protein;
    const carbs = req.body.carbs;
    const fat = req.body.fat;
    const calories = req.body.calories;

    const sqlInsert = 'INSERT INTO food (name, protein, carbs, fat, calories) VALUES (?,?,?,?,?)'
    db.query(
        sqlInsert, 
        [name, protein, carbs, fat, calories], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    )
})


app.get('/food', (req, res) => {
    db.query("SELECT * FROM food", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


app.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    const sqlDelete = "DELETE FROM food WHERE name = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) {
            console.log(err)
        } 
    })
})

///////////////////////// TDEE DATA ONLY ////////////////////////////////////

app.post("/tdee", (req, res) => {
    const protein = req.body.protein;
    const carbs = req.body.carbs;
    const fat = req.body.fat;
    const calories = req.body.calories;

    const sqlInsert = 'INSERT INTO tdee (protein, carbs, fat, calories) VALUES (?,?,?,?)'
    db.query(
        sqlInsert, 
        [protein, carbs, fat, calories], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    )
})


app.get('/tdee', (req, res) => {
    db.query("SELECT * FROM tdee", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})




///////////////////////// PERSONAL DATA ONLY ////////////////////////////////////

app.post("/personal", (req, res) => {
    const weight = req.body.weight;
    const height = req.body.height;
    const age = req.body.age;

    const sqlInsert = 'INSERT INTO personal (weight, height, age) VALUES (?,?,?)'
    db.query(
        sqlInsert, 
        [weight, height, age], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    )
})


app.get('/personal', (req, res) => {
    db.query("SELECT * FROM personal", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})



app.listen(3001, () => {
    console.log("Server working on port 3001")
})




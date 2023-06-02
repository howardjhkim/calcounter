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
    const cutProtein = req.body.cutProtein;
    const cutCarbs = req.body.cutCarbs;
    const cutFat = req.body.cutFat;
    const cutCalories = req.body.cutCalories;
    
    const maintainProtein = req.body.maintainProtein;
    const maintainCarbs = req.body.maintainCarbs;
    const maintainFat = req.body.maintainFat;
    const maintainCalories = req.body.maintainCalories;
    
    const gainProtein = req.body.gainProtein;
    const gainCarbs = req.body.gainCarbs;
    const gainFat = req.body.gainFat;
    const gainCalories = req.body.gainCalories;

    const sqlInsert = 'INSERT INTO tdee (cutProtein, cutCarbs, cutFat, cutCalories, maintainProtein, maintainCarbs, maintainFat, maintainCalories, gainProtein, gainCarbs, gainFat, gainCalories) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
    db.query(
        sqlInsert, 
        [cutProtein, cutCarbs, cutFat, cutCalories, maintainProtein, maintainCarbs, maintainFat, maintainCalories, gainProtein, gainCarbs, gainFat, gainCalories], 
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



app.delete('/delete/:name', (req, res) => {
    const name = req.params.name;
    const sqlUpdate = "UPDATE SET tdee WHERE name = ?";

    db.query(sqlUpdate, name, (err, result) => {
        if (err) {
            console.log(err)
        } 
    })
})











///////////////////////// PERSONAL DATA ONLY ////////////////////////////////////

app.post("/personal", (req, res) => {
    const age = req.body.age;
    const height = req.body.height;
    const weight = req.body.weight;
    const goalWeight = req.body.goalWeight;
    const activity = req.body.activity;
    const startDate = req.body.startDate;
    const targetDate = req.body.targetDate;
    const daysRemaining = req.body.daysRemaining;
    const tdeeDb = req.body.tdeeDb;
    const bmrDb = req.body.bmrDb;
    const fitnessGoal = req.body.fitnessGoal;

    const sqlInsert = 'INSERT INTO personal (age, height, weight, activity, goalWeight, startDate, targetDate, daysRemaining, tdeeDb, bmrDb, fitnessGoal) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    db.query(
        sqlInsert, 
        [age, height, weight, activity, goalWeight, startDate, targetDate, daysRemaining, tdeeDb, bmrDb, fitnessGoal], 
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




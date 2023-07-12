const express = require('express');
const cors = require('cors')
const app = express()
require("dotenv").config();

app.use(cors());
app.use(express.json());



const db = require('./models')


//Routers
const foodRouter = require('./routes/Food')
app.use("/food", foodRouter)

const personalRouter = require('./routes/Personal')
app.use("/personal", personalRouter)

const tdeeRouter = require('./routes/Tdee')
app.use("/tdee", tdeeRouter)


const usersRouter = require('./routes/Users')
app.use("/users", usersRouter)

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server working on port 3001")
    })
})
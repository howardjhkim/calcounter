const express = require('express')
const router = express.Router()
const { Personal } = require("../models")




router.post("/", async (req, res) => {
    try {
        const {
            age, height, weight, goalWeight, 
            activity, startDate, targetDate, daysRemaining,
            tdeeDb, bmrDb, fitnessGoal
        } = req.body ;
        await Personal.create({
            age, height, weight, goalWeight, 
            activity, startDate, targetDate, daysRemaining,
            tdeeDb, bmrDb, fitnessGoal
        })
        res.send("Personal info inserted")
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await Personal.findAll();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

module.exports = router
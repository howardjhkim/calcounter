const express = require('express')
const router = express.Router()
const { Personal } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware");



router.post("/", validateToken, async (req, res) => {
    try {
        const {
            age, height, weight, goalWeight, 
            activity, startDate, targetDate, daysRemaining,
            tdeeDb, bmrDb, fitnessGoal
        } = req.body ;

        const userId = req.user.id;
        id = userId;

        await Personal.create({
            age, height, weight, goalWeight, 
            activity, startDate, targetDate, daysRemaining,
            tdeeDb, bmrDb, fitnessGoal, UserId: userId
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

router.get("/getById/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const personal = await Personal.findAll({where: {UserId: id}})
        const serializedData = personal.map(item => item.toJSON());

        res.json(serializedData);
    } catch {
        console.log(err)
        res.sendStatus(500)
    }
})



module.exports = router
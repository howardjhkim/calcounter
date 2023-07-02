const express = require('express')
const router = express.Router()
const { Tdee } = require("../models")



router.post("/", async (req, res) => {
    try {
        const { 
            cutProtein, cutCarbs, cutFat, cutCalories,
            maintainProtein, maintainCarbs, maintainFat, maintainCalories,
            gainProtein, gainCarbs, gainFat, gainCalories
        } = req.body
        await Tdee.create({
            cutProtein, cutCarbs, cutFat, cutCalories,
            maintainProtein, maintainCarbs, maintainFat, maintainCalories,
            gainProtein, gainCarbs, gainFat, gainCalories
        })
        res.send("Tdee info inserted")
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


router.get("/", async(req, res) => {
    try {
        const info = await Tdee.findAll();
        res.send(info);
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.delete("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        await Tdee.destroy({
            where: {
                name: name
            }
        })
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router

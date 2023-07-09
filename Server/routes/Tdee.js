const express = require('express')
const router = express.Router()
const { Tdee } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware");



router.post("/", validateToken, async (req, res) => {
    try {
        const { 
            cutProtein, cutCarbs, cutFat, cutCalories,
            maintainProtein, maintainCarbs, maintainFat, maintainCalories,
            gainProtein, gainCarbs, gainFat, gainCalories
        } = req.body

        req.body.UserId = req.user.id
        UserId = req.body.UserId

        await Tdee.create({
            cutProtein, cutCarbs, cutFat, cutCalories,
            maintainProtein, maintainCarbs, maintainFat, maintainCalories,
            gainProtein, gainCarbs, gainFat, gainCalories, UserId
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


router.get("/getById/:id", async (req, res) => {
    
    try {
        const id = req.params.id;
        const tdee = await Tdee.findAll({where: {UserId: id}})
        const serializedData = tdee.map(item => item.toJSON());

        res.json(serializedData);
    } catch {
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

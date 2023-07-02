// When a new food is submitted, it is created in /create then is inserted into the "food" table
const express = require('express')
const router = express.Router()
const { Food } = require("../models")



router.post("/", async (req, res) => {
    try {
        const { name, protein, carbs, fat, calories } = req.body;
        await Food.create(
            { name, protein, carbs, fat, calories }
        )
        res.send("Food info inserted")
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.get("/", async (req, res) => {
    try {
        const foods = await Food.findAll();
        res.send(foods);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

router.delete('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        await Food.destroy({
            where: {
            name: name
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router
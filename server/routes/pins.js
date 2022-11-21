const router = require('express').Router();
const Pin = require('../models/Pin')

//create Pin
router.post("/",async (req, res) => {
    const newPin = new Pin(req.body)
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get pins
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    //console.log(id)
    try {
        await Pin.findByIdAndRemove(id).exec();
        res.status(200)
    } catch (err) {
        res.status(500).json(err)
        //console.log("Error")
    }
})

module.exports = router;

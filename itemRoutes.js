const express = require('express');
const router = new express.Router();
const ExpressError = require("./expressError")
const items = require('./fakeDb');

router.get("/", (req, res) => {
    res.json({ items });
});


router.post("/", (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    res.status(201).json({ item: newItem })
});


router.get("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    res.json({ item: foundItem })
});


router.patch("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name 
    res.json({ item: foundItem })
});


router.delete("/:name", (req, res) => {
    const foundItem = items.findIndex(item => item.name === req.params.name);
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404)
      }
    items.splice(foundItem, 1);
    res.json({ message: "Deleted" });
});


module.exports = router;
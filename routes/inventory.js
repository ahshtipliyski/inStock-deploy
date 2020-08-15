const express = require("express");
const router = express.Router();
const inventoryData = require("../data/inventory.json");
const fileName = '../server/data/inventory.json';
const fs = require('fs');
const uuid = require("uuid");

//Get Single Inventory Item
router.get("/:id", (req, res) => {
	const found = inventoryData.some((item) => item.id === req.params.id);

	if (found) {
		res.json(inventoryData.filter((item) => item.id === req.params.id));
	} else {
		res.status(404).json({ msg: `No item with ID: ${req.params.id}` });
	}
});

//Get All Inventory Items

router.get("/", (req, res) => res.json(inventoryData));

//Add new inventory item


router.post('/', (req, res) => {
	if (!req.body.name || !req.body.lastOrdered || !req.body.city || !req.body.country || !req.body.quantity || !req.body.isInstock || !req.body.description) {
		res.status(400).json({ err: "All fields need to be filled" });
	} else {
		inventoryData.push({
			id: uuid.v4(),
			name: req.body.name,
			lastOrdered: req.body.lastOrdered,
			city: req.body.city,
			country: req.body.country,
			quantity: req.body.quantity,
			isInstock: req.body.isInstock,
			description: req.body.description
		})

		// Add new inventory item to JSON

		fs.writeFileSync(fileName, JSON.stringify(inventoryData), "utf8", err => {
			if (err) {
				console.log(err);
			}
		});
		res.json(inventoryData)
	}

});

//Delete Inventory Item

router.delete("/:id", (req, res) => {
    const id = req.params.id
    const selected = inventoryData.find(item => item.id === id)
    for( let i = 0; i < inventoryData.length; i++)
    { if ( inventoryData[i] === selected) { inventoryData.splice(i, 1); }}
    res.json(inventoryData)
})

module.exports = router;
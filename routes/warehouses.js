const express = require("express");
const router = express.Router();
const warehouseData = require('../data/warehouses.json');
const inventoryData = require('../data/inventory.json')
const fileName = '../server/data/warehouses.json';
const fs = require('fs');

// Get request for ALL warehouse 

router.get("/", (req, res) => {
	res.json(warehouseData);
});


// Post creating a new warehouse 

router.post("/", (req, res) => {
	if (
		!req.body.name ||
		!req.body.address.street ||
		!req.body.address.location ||
		!req.body.contact.name ||
		!req.body.contact.position ||
		!req.body.contact.phone ||
		!req.body.contact.email
	) {
		res.status(400).json({ message: "Unable to POST" });
	} else {
		warehouseData.push({
			id: Date.now().toString(),
			name: req.body.name,
			address: {
				street: req.body.address.street,
				location: req.body.address.location,
			},
			contact: {
				name: req.body.contact.name,
				position: req.body.contact.position,
				phone: req.body.contact.phone,
				email: req.body.contact.email,
			},
			inventoryCategories: req.body.inventoryCategories,
		});
	}
	res.json(warehouseData);
});

// router.get('/', (req, res) => {
//   res.json(warehouseData);
// })

//Get single warehouse and inventory detials
router.get("/:id", (req, res) => {
	let warehouseId = req.params.id;
	let warehouseClicked = warehouseData.find((location) => {
	  return location.id === warehouseId;
	});
	if (!warehouseClicked) {
	  return res.status(404).json({
		"err": "Warehouse ID does not match"
	  });
	} else {
	  let warehouseClickedInventory = inventoryData.filter(item => {
		return item.warehouseId === warehouseId;
	  });
	  warehouseClicked.inventory = warehouseClickedInventory;
	  return res.json(warehouseClicked)
	}
  });

// // Post creating a new warehouse 

// router.post('/', (req, res) => {
//   if (!req.body.name || !req.body.address.street || !req.body.address.location || !req.body.contact.name || !req.body.contact.position || !req.body.contact.phone || !req.body.contact.email) {
//     res.status(400).json({ message: 'Unable to POST' });
//   } else {
//     warehouseData.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       address: {
//         street: req.body.address.street,
//         location: req.body.address.location
//       },
//       contact: {
//         name: req.body.contact.name,
//         position: req.body.contact.position,
//         phone: req.body.contact.phone,
//         email: req.body.contact.email
//       },
//       inventoryCategories: req.body.inventoryCategories
//     })

//     // Add new inventory item to JSON
//     fs.writeFileSync(fileName, JSON.stringify(warehouseData), "utf8", err => {
//       if (err) {
//         console.log(err);
//       }
//     });

//     res.json(warehouseData)
//   }
// })



module.exports = router;

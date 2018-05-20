// Dependencies
const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

// get route -> index
router.get("/", (req, res)=> {
	res.redirect("/burgers");
});

router.get("/burgers", (req, res)=> {
	// express callback response by calling burger.selectAllBurger
	burger.all(function(burgerData) {
		// wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
	res.render("index", { burger_data : burgerData });		
	});
});

// post route -> back to index
router.post("/burgers/create", (req, res)=> {
	// takes the request object using it as input for burger.addBurger
	burger.create(req.body.burger_name, function(result) {
		//wrappter for orm.js that using MySQL insert callback will return a log to console,
		// render back to index with handle
		console.log(result);
		res.redirect("/");
	});
});

// put route -> back to index
router.put("/burgers/update", (req, res)=> {
	burger.update(req.body.burger_id, (result)=> {
	//wrappter for orm.js that using MySQL insert callback will return a log to console,
	// render back to index with handlebars
	console.log(result);
	res.redirect("/");
	});
});

module.exports = router;
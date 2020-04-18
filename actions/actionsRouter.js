const express = require('express');
const actions = require("../data/helpers/actionModel");


const router = express.Router();
module.exports = router;


//////// This handles routes starting with "localhost:3456/actions"  ////////

//////////////// GET ////////////////

router.get('/', (req, res) => {
	actions.get()
		.then((actions) => {
			res.status(200).json(actions)
		})
		.catch((error) => {
			next(error)
		})
});

// //////////////// GET by ID ////////////////
// router.get('/:id', (req, res) => {
// 	res.status(200).json(req.action)
// });


//////////////// POST ////////////////

router.post('/', (req, res) => {
	actions.insert({ ...req.body, project_id: req.params.id })
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			next(error)
		})
});


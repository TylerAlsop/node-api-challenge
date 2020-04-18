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

//////////////// GET by ID ////////////////

router.get('/:id', (req, res) => {
	actions.get(req.params.id)
		.then(action => {
			res.status(200).json(action)
		})
		.catch((error) => {
			next(error)
		})

});


//////////////// POST ////////////////
/* 
This can be found under the POST req in projectsRouter.js
*/

//////////////// PUT ////////////////

router.put('/:id', (req, res) => {
	actions.update(req.params.id, req.body)
		.then((action) => {
		res.status(200).json(action)
		})
		.catch((error) => {
		next(error)
		})
  });


//////////////// DELETE ////////////////

router.delete('/:id', (req, res) => {
	actions.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
			res.status(200).json({
				message: "The action you have selected has been deleted.",
			})
			} else {
			res.status(404).json({
				message: "The action you selected could not be found",
			})
			}
		})
		.catch((error) => {
			next(error)
		})
});
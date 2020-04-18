const express = require('express');
const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel")


const router = express.Router();

//////// This handles routes starting with "localhost:3456/projects"  ////////

//////////////// GET ////////////////

router.get('/', (req, res) => {
	projects.get()
		.then((projects) => {
			res.status(200).json(projects)
		})
		.catch((error) => {
			next(error)
		})
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    projects.get(id)
        .then(project => {
            if (id) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "The project with that ID could not be found."
                })
            }
        })
        .catch((error) => {
            next(error)
        })
});

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    
    projects.getProjectActions(id)
        .then((posts) => {
        res
            .status(200)
            .json(posts)
        })
        .catch((error) => {
                next(error)
            })
});


//////////////// POST ////////////////

router.post('/', (req, res) => {
  projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project)
    })
    .catch((error) => {
			next(error)
		})
});


//////////////// PUT ////////////////

router.put('/:id', (req, res) => {
  projects.update(req.params.id, req.body)
  .then((project) => {
    res.status(200).json(project)
  })
  .catch((error) => {
    next(error)
  })
});

//////////////// DELETE ////////////////

router.delete('/:id', (req, res) => {
  projects.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({
        message: "The project you have selected has been deleted.",
      })
    } else {
      res.status(404).json({
        message: "The project you selected could not be found.",
      })
    }
  })
  .catch((error) => {
    next(error)
  })
});


// //////////////// Custom Middleware ////////////////


// function validateProjectId() {
//   return (req, res, next) => {
// 		projects.getById(req.params.id)
// 			.then((project) => {
// 				if (project) {
// 					req.project = project
// 					next()
// 				} else {
// 					res.status(400).json({
// 						message: "Invalid project ID."
// 					})
// 				}
// 			})
// 			.catch((error) => {
// 				next(error)
// 			})
// 	}
// }

// function validateProject() {
//   return (req, res, next) => {
// 		if (!req.body) {
// 			return res.status(400).json({
// 				message: "Missing project data.",
// 			})
// 		} else if (!req.body.name) {
//       return res.status(400).json({
// 				message: "Missing required name field.",
// 			})
//     } else {
// 			next()
// 		}
// 	}
// }

// function validatePost() {
//   return (req, res, next) => {
//     if (!req.body.text) {
//       return res.status(400).json({
//         message: "Missing required text Field."
//       })
//     } else {
//       next()
//     }
//   }
// }

module.exports = router;

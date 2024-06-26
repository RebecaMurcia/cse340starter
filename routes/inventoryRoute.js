//Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

//Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build inventory item detail view
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));


//Route to build management view
router.get("/management", utilities.handleErrors(invController.buildVehicleMngmt));

//Route to build error
router.get("/error/", utilities.handleErrors(invController.errorRoute));
router.get("/error/", invController.AnotherError)

module.exports = router;


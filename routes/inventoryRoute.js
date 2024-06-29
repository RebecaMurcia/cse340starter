//Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const regValidate = require('../utilities/inventory-validation')
const utilities = require("../utilities")


//Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build inventory item detail view
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));


//Route to build management view
router.get("/management", utilities.handleErrors(invController.buildVehicleMngmt));

//Route to build add-Classification view
router.get("/add-classification", utilities.handleErrors(invController.addClassificationName));

//Process the add new classification data
router.post(
    "/add-classification",
    regValidate.registrationRules(),
    regValidate.checkClassData,
    utilities.handleErrors(invController.addClassificationName)
)


//Route to build add-inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInv));


//Route to build error
router.get("/error/", utilities.handleErrors(invController.errorRoute));
router.get("/error/", invController.AnotherError)

module.exports = router;


//Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const dataValidate = require('../utilities/inventory-validation')
const utilities = require("../utilities")


//Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build inventory item detail view
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));


//Route to build management view
router.get("/", utilities.handleErrors(invController.buildVehicleMngmt));

//Route to build add-Classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

//Process the add new classification data
router.post(
    "/add-classification",
    dataValidate.classificationRules(),
    dataValidate.checkClassData,
    utilities.handleErrors(invController.addClassificationName)
)

//Route to build add-inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInv));

//Process ADD NEW INVENTORY data
router.post(
    "/add-inventory",
    dataValidate.inventoryRules(),
    dataValidate.checkInvData,
    utilities.handleErrors(invController.addInvData)
)

/* ***************
* Get inventory for AJAX Route
***************** */
//Router to get vehicles/cars for management view to update and delete
router.get("/getInventory/:classification_id", utilities.handleErrors
(invController.getInventoryJSON))

//Route to build error
router.get("/error/", utilities.handleErrors(invController.errorRoute));
router.get("/error/", invController.AnotherError)

//Route to edit vehicle/inventory form 
router.get("/edit/:itemId", utilities.handleErrors(invController.editVehicleForm));

//Route to handle incoming request to edit vehicle/inventory form
router.post("/update/", 
    dataValidate.inventoryRules(),
    dataValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory));

//Route to delete vehicle/inventory form
router.get("/delete/:itemId", utilities.handleErrors(invController.deleteInvConfirmation));
router.post("/delete/", 
    utilities.handleErrors(invController.deleteInventory));   
    
 //Route to process new review
 router.post("/postedReview/",
    utilities.handleErrors(invController.review));   

module.exports = router;


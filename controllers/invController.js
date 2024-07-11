const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ********************
* Build inventory by classification view
* ********************/
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId 
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: `${className}` + "vehicles",
        nav,
        grid,
        errors: null,
    })
}

/* **********************
* Build inventory item detail view
* **********************/
invCont.buildByItemId = async function (req, res, next) {
  //get inventory from the request
  const inv_id = req.params.itemId
  //use inventory id to get inventory based on id
  const data = await invModel.getItemById(inv_id)
  //build view with the vehicles/inventory results
  const grid = await utilities.buildItemGrid(data)
  //get nav
  let nav = await utilities.getNav()
  //create a title for the page
  const itemName = data[0].inv_make
  const itemModel = data[0].inv_model
  const itemYear = data[0].inv_year
  //render page
  res.render("./inventory/detail", {
    title:`${itemName} ${itemModel} ${itemYear}`,
    nav,
    grid,
    errors: null,
  })
}

/* **********************
* Build vehicle/inventory management view 
* **********************/
invCont.buildVehicleMngmt = async function (req,res,next){
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.buildClassificationList();

  res.render("inventory/management", {
    title:"Inventory Management",
    nav,
    classificationSelect,
    errors: null,
  })
}

/* **********************
* Build ADD CLASSIFICATION form view
* **********************/
invCont.buildAddClassification = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title:"Add Classification",
    nav,
    errors: null,
  })
}

/* ******************
Process ADD CLASSIFICATION data
******************** */
invCont.addClassificationName = async function (req, res, next) {
  
  const { classification_name } = req.body

  const addClassResult = await invModel.addClassificationName(
    classification_name
  ) 

  if (addClassResult) {
    req.flash(
      "notice",
      `Classification ${classification_name} was successfully added.`
    )
    res.status(201).redirect("./management")
  } else {
    req.flash("notice", "Sorry, new classification couldn't be added.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav: await utilities.getNav(),
      errors: null,
    })
  }
}

/* **********************
* Build ADD INVENTORY view
* **********************/
invCont.buildAddInv = async function (req,res,next){
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title:"Add New Vehicle",
    nav,
    classificationSelect,
    errors: null,
  })
}

/* ******************
Process ADD NEW INVENTORY data
******************** */
invCont.addInvData = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationSelect = await utilities.buildClassificationList();
  const { 
    classification_id, 
    inv_make,
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color 
  } = req.body
  
  const addInvResult = await invModel.addInvData(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  )

  if (addInvResult) {
    req.flash (
      "notice",
      `Congratulations! New vehicle was added.`
    )
    return res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
      classificationSelect,
    });
  } else {
    req.flash("notice","Sorry, the vehicle was not added.")
    return res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      errors: null,
      classificationSelect,
    });
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Deliver vehicle edit form view
 * ************************** */
invCont.editVehicleForm = async function (req, res, next) {
  //get inventory from the request
  const inv_id = req.params.itemId
    //get nav
    let nav = await utilities.getNav()
  //use inventory id to get inventory based on id
  const data = await invModel.getItemById(inv_id)
  //create a title for the page
  const title = data.inv_make + " " + data.inv_model
  //build classification list 
  let classificationSelect = await utilities.buildClassificationList(data.classification_id)
  //render page
  res.render("./inventory/edit-inventory", {
    title: "Edit" + title,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: data.inv_id,
    inv_make: data.inv_make,
    inv_model: data.inv_model,
    inv_year: data.inv_year,
    inv_description: data.inv_description,
    inv_image: data.inv_image,
    inv_thumbnail: data.inv_thumbnail,
    inv_price: data.inv_price,
    inv_miles: data.inv_miles,
    inv_color: data.inv_color,
    classification_id: data.classification_id
  })
}

/* **********************
* 500 Error
* **********************/
invCont.AnotherError= async function (req, res, next){
  let nav = await utilities.getNav()
  const data = await invModel.getItemByError()
  res.render("error"), {
    nav
  }
}


module.exports = invCont;
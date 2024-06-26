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
  const item_id = req.params.itemId
  const data = await invModel.getItemById(item_id)
  const grid = await utilities.buildItemGrid(data)
  let nav = await utilities.getNav()
  const itemName = data[0].inv_make
  const itemModel = data[0].inv_model
  const itemYear = data[0].inv_year
  res.render("./inventory/detail", {
    title:`${itemName} ${itemModel} ${itemYear}`,
    nav,
    grid,
  })
}

/* **********************
* Build management view
* **********************/
invCont.buildVehicleMngmt = async function (req,res,next){
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title:"Vehicle Management",
    nav,
    errors: null,
  })
}

/* **********************
* Build ADD CLASSIFICATION view
* **********************/
invCont.addClassificationName = async function (req,res,next){
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
async function addClassificationName (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const addClassResult = await invModel.addClassificationName(
    classification_name
  ) 
  if (addClassResult) {
    req.flash(
      "notice",
      `You've added ${classification_name}.`
    )
    res.status(201).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, new classification couldn't be added.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}



/* **********************
* Build ADD INVENTORY view
* **********************/
invCont.buildAddInv = async function (req,res,next){
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title:"Add New Car",
    nav,
    errors: null,
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


module.exports = invCont
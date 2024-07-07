const pool = require("../database/")

/* ********************
* Get all classification data
* ******************** */
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* *******************
* Get all inventory items and classification_name by classification_id
* Unit 3
* ********************* */
async function getInventoryByClassificationId(classification_id) {
    try{
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows;
    } catch (error) {
        console.error("getClassificationbyid error" + error)
    }
}

/* *******************
* a function to retrieve the data for a specific 
vehicle in inventory, based on the inventory id 
(this should be a single function, not a separate one for each vehicle)
******************** */
async function getItemById(inv_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory WHERE inv_id = $1`,
        [inv_id]
      )
      return data.rows
    } catch (error) {
      console.error("getItemsById error " + error)
    }
  }

  /* ****************
  ADD CLASSIFICATION data
  ***************** */
async function addClassificationName(classification_name){
try {
  const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING*"
  return await pool.query(sql, [classification_name])
} catch (error) {
  return error.message
}
}

/* *******************
ADD NEW INVENTORY data
******************** */
async function addInvData (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color){
  try{
    const sql ="INSERT INTO inventory (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING*"
    return await pool.query(sql, [classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color])
  } catch (error) {
    return error.message
  }
}

  /* ***************
  * 5000 Error
  ************** */
  async function getItemByError() {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory WHERE inv_d = 1`,
      )
      return data.rows
    } catch (error) {
      console.error("getItemsById error " + error)
    }
  }
  
module.exports = {getClassifications, getInventoryByClassificationId, getItemById, getItemByError, addClassificationName, addInvData};
//Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

//Defaul route to /account/ root 
router.get(
  "/",
  utilities.checkLogin, 
  utilities.handleErrors(accountController.accountManagement))

//Deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

//Deliver registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  "/register-user",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Route to logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout));


//Update Account
router.get("/update/:accountId", utilities.handleErrors(accountController.buildUpdate));
//Process update account
router.post(
  "/update",
  regValidate.updateRules(), 
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
  );

  router.post(
    "/update-password",
    regValidate.updatePasswordRules(),
    regValidate.checkUpdatePasswordData,
    utilities.handleErrors(accountController.updatePassword)
  );

module.exports = router;

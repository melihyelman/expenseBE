const express = require('express');
const { index, create, login, invoicesList } = require('../controllers/Users');
const validate = require('../middlewares/validate');
const validations = require('../validations/Users');
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", index)
router.route("/").post(validate(validations.createValidation), create)
router.route("/login").post(validate(validations.loginValidation), login)
router.route("/invoices").get(authenticate, invoicesList)

module.exports = router;
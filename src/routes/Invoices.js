const express = require('express');
const { create, index } = require('../controllers/Invoices');
const authenticate = require("../middlewares/authenticate");
const validate = require('../middlewares/validate');
const validations = require('../validations/Invoices');

const router = express.Router();

router.route('/').get(authenticate, index)
router.route("/").post(authenticate, validate(validations.createValidation), create)

module.exports = router;
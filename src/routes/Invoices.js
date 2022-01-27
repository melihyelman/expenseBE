const express = require('express');
const { create, index, update } = require('../controllers/Invoices');
const authenticate = require("../middlewares/authenticate");
const validate = require('../middlewares/validate');
const validations = require('../validations/Invoices');

const router = express.Router();

router.route('/').get(authenticate, index)
router.route("/").post(authenticate, validate(validations.createValidation), create)
router.route("/:id").patch(authenticate, validate(validations.updateValidation), update)

module.exports = router;
const express = require('express');
const { index, create } = require('../controllers/Users');
const validate = require('../middlewares/validate');
const validations = require('../validations/Users');

const router = express.Router();

router.get("/", index)
router.route("/").post(validate(validations.createValidation), create)

module.exports = router;
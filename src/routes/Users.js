const express = require('express');
const { index, create, login } = require('../controllers/Users');
const validate = require('../middlewares/validate');
const validations = require('../validations/Users');

const router = express.Router();

router.get("/", index)
router.route("/").post(validate(validations.createValidation), create)
router.route("/login").post(validate(validations.loginValidation), login)

module.exports = router;
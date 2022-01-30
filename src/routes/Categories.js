const express = require('express');
const { create, index, update, deleteCategory } = require('../controllers/Categories');
const authenticate = require("../middlewares/authenticate");
const validate = require('../middlewares/validate');
const validations = require('../validations/Categories');

const router = express.Router();

router.route('/').get(authenticate, index)
router.route("/").post(authenticate, validate(validations.categoryValidation), create)
router.route("/:id").patch(authenticate, validate(validations.categoryValidation), update)
router.route("/:id").delete(authenticate, deleteCategory)

module.exports = router;
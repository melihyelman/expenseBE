const express = require('express');
const { index, create, login, update, invoicesList, resetPassword, deleteUser, changePassword, updateProfileImage } = require('../controllers/Users');
const validate = require('../middlewares/validate');
const validations = require('../validations/Users');
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.route("/").get(index)
router.route("/:id").delete(authenticate, deleteUser)
router.route("/invoices").get(authenticate, invoicesList)

router.route("/").post(validate(validations.createValidation), create)
router.route("/login").post(validate(validations.loginValidation), login)
router.route("/reset-password").post(validate(validations.resetPasswordValidation), resetPassword)
router.route("/change-password").post(authenticate, validate(validations.passwordValidation), changePassword)
router.route("/update-profile-image").post(authenticate, updateProfileImage)

router.route("/").patch(authenticate, validate(validations.updateValidation), update)

module.exports = router;
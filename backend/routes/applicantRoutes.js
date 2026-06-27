const express = require("express");
const router = express.Router();

const { applyLoan } = require("../controllers/applicantController");

router.post("/apply", applyLoan);

module.exports = router;
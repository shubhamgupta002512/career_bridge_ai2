const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyById } = require('../controllers/companyController');

router.route('/').get(getCompanies);
router.route('/:id').get(getCompanyById);

module.exports = router;

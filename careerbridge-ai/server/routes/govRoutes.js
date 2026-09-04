const express = require('express');
const router = express.Router();
const { getGovOpportunities, getGovOpportunityById, checkEligibility } = require('../controllers/govController');

router.route('/').get(getGovOpportunities);
router.route('/eligibility').post(checkEligibility);
router.route('/:id').get(getGovOpportunityById);

module.exports = router;

const express = require('express');
const {
  careerAdvice,
  jobRecommendations,
  skillGap,
  careerRoadmap
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes below are protected

router.post('/career-advice', careerAdvice);
router.post('/recommendations', jobRecommendations);
router.post('/skill-gap', skillGap);
router.post('/roadmap', careerRoadmap);

module.exports = router;

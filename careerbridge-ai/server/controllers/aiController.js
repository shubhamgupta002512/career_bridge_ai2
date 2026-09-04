const { getCareerAdvice, getJobRecommendations, getSkillGapAnalysis, getCareerRoadmap } = require('../services/aiService');
const Job = require('../models/Job');

// @desc    Get career advice
// @route   POST /api/ai/career-advice
// @access  Private
exports.careerAdvice = async (req, res) => {
  try {
    const { question } = req.body;
    const result = await getCareerAdvice(req.user, question);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get job recommendations
// @route   POST /api/ai/recommendations
// @access  Private
exports.jobRecommendations = async (req, res) => {
  try {
    const jobs = await Job.find(); // In real-world, fetch jobs and pass to AI for recommendation
    const result = await getJobRecommendations(req.user, jobs);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get skill gap analysis
// @route   POST /api/ai/skill-gap
// @access  Private
exports.skillGap = async (req, res) => {
  try {
    const { targetRole } = req.body;
    const result = await getSkillGapAnalysis(req.user, targetRole);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get career roadmap
// @route   POST /api/ai/roadmap
// @access  Private
exports.careerRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;
    const result = await getCareerRoadmap(goal);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

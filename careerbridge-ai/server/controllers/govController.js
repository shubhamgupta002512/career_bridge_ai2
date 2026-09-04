const GovernmentOpportunity = require('../models/GovernmentOpportunity');

// @desc    Get all government opportunities
// @route   GET /api/government-jobs
// @access  Public
exports.getGovOpportunities = async (req, res) => {
  try {
    const { category, location } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (location) {
      // Assuming location might match state or city if they exist on the model
      query.location = { $regex: location, $options: 'i' };
    }
    
    const opportunities = await GovernmentOpportunity.find(query);
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single government opportunity
// @route   GET /api/government-jobs/:id
// @access  Public
exports.getGovOpportunityById = async (req, res) => {
  try {
    const opportunity = await GovernmentOpportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: 'Government opportunity not found' });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check eligibility for government jobs
// @route   POST /api/government-jobs/eligibility
// @access  Public
exports.checkEligibility = async (req, res) => {
  try {
    const userProfile = req.body;
    
    // This is a basic implementation of eligibility checking.
    // In a real scenario, this would be more complex and compare against specific requirements.
    
    const matched = [];
    const missing = [];
    let eligible = false;
    let reason = '';
    
    // Example logic
    if (userProfile.age && userProfile.age >= 18) {
      matched.push('age');
      eligible = true;
    } else {
      missing.push('age');
      reason = 'Age must be 18 or above.';
    }
    
    if (userProfile.education) {
      matched.push('education');
    } else {
      missing.push('education');
      eligible = false;
      reason += (reason ? ' ' : '') + 'Education is required.';
    }

    res.status(200).json({
      eligible,
      matched,
      missing,
      reason
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

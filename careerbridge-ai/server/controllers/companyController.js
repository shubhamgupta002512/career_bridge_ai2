const Company = require('../models/Company');
const Job = require('../models/Job');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get company by ID and its jobs
// @route   GET /api/companies/:id
// @access  Public
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    // Assuming the Job model has a companyId field referencing Company
    const jobs = await Job.find({ companyId: req.params.id });
    
    res.status(200).json({ company, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

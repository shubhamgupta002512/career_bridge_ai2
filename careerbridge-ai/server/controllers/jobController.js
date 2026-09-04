const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { title, location, experience, jobType } = req.query;
    let query = {};
    
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (experience) {
      query.experience = experience;
    }
    if (jobType) {
      query.jobType = jobType;
    }
    
    const jobs = await Job.find(query);
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Admin)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Admin)
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Admin)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    await job.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Save a job for user
// @route   POST /api/jobs/:id/save
// @access  Private
exports.saveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Convert req.params.id to string for reliable comparison
    const jobIdStr = req.params.id.toString();
    const alreadySaved = user.savedJobs.some(id => id.toString() === jobIdStr);
    
    if (!alreadySaved) {
      user.savedJobs.push(req.params.id);
      await user.save();
    }
    res.status(200).json({ success: true, data: user.savedJobs });
  } catch (error) {
    console.error("SAVE JOB ERROR:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Unsave a job for user
// @route   DELETE /api/jobs/:id/save
// @access  Private
exports.unsaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const jobIdStr = req.params.id.toString();
    user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobIdStr);
    await user.save();
    
    res.status(200).json({ success: true, data: user.savedJobs });
  } catch (error) {
    console.error("UNSAVE JOB ERROR:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get saved jobs
// @route   GET /api/jobs/saved
// @access  Private
exports.getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');
    res.status(200).json({ success: true, count: user.savedJobs.length, data: user.savedJobs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

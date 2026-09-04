const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please add a job title'] },
  companyId: { type: mongoose.Schema.ObjectId, ref: 'Company' },
  company: { type: String, required: [true, 'Please add a company name'] },
  sector: { type: String, default: 'Private' },
  category: { type: String, required: true },
  location: { type: String, required: [true, 'Please add a location'] },
  workMode: { type: String, enum: ['On-site', 'Hybrid', 'Remote'], default: 'On-site' },
  salary: { type: String, default: 'Not specified' },
  experience: { type: String, required: [true, 'Please add required experience'] },
  education: { type: String, default: 'Any Graduation' },
  skills: { type: [String], required: [true, 'Please add required skills'] },
  description: { type: String, required: [true, 'Please add a job description'] },
  responsibilities: { type: [String], default: [] },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'], default: 'Full-time' },
  applicationUrl: { type: String, default: '' },
  sourceUrl: { type: String, default: '' },
  isDemo: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  lastVerifiedDate: { type: Date },
  status: { type: String, enum: ['Draft', 'Needs Verification', 'Verified', 'Open', 'Closed', 'Expired'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);

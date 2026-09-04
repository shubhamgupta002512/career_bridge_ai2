const mongoose = require('mongoose');

const GovernmentOpportunitySchema = new mongoose.Schema({
  organization: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  department: { type: String, default: '' },
  location: { type: String, required: true },
  vacancies: { type: String, default: 'Not announced' },
  qualification: { type: String, required: true },
  degree: { type: String, default: '' },
  percentage: { type: String, default: '' },
  ageLimit: { type: String, required: true },
  ageRelaxation: { type: String, default: '' },
  salary: { type: String, default: 'Not specified' },
  payLevel: { type: String, default: '' },
  applicationStartDate: { type: Date },
  applicationLastDate: { type: Date },
  examDate: { type: Date },
  selectionProcess: { type: [String], default: [] },
  applicationFee: { type: String, default: '' },
  officialWebsite: { type: String, required: true },
  notificationUrl: { type: String, default: '' },
  applicationUrl: { type: String, default: '' },
  syllabusUrl: { type: String, default: '' },
  previousPaperUrl: { type: String, default: '' },
  admitCardUrl: { type: String, default: '' },
  resultUrl: { type: String, default: '' },
  sourceUrl: { type: String, default: '' },
  isDemo: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  lastVerifiedDate: { type: Date },
  status: { type: String, enum: ['Opening Soon', 'Open', 'Closing Soon', 'Closed', 'Result Pending', 'Exam Upcoming'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('GovernmentOpportunity', GovernmentOpportunitySchema);

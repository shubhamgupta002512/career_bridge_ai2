const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, default: '' },
  industry: { type: String, required: true },
  description: { type: String, default: '' },
  website: { type: String, required: true },
  careersUrl: { type: String, required: true },
  internshipUrl: { type: String, default: '' },
  location: { type: [String], default: [] },
  isVerified: { type: Boolean, default: false },
  lastVerifiedDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);

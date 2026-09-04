const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  url: { type: String, required: true },
  sourceType: {
    type: String,
    enum: ['Company Careers', 'Government Recruitment', 'Official Notification', 'Official Syllabus', 'Official Application', 'Official Result', 'Official Admit Card'],
    required: true
  },
  official: { type: Boolean, default: true },
  lastVerified: { type: Date },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Source', SourceSchema);

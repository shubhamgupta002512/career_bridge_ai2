const mongoose = require('mongoose');

const ExamSyllabusSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.ObjectId, ref: 'GovernmentOpportunity', required: true },
  sections: [{
    name: { type: String, required: true },
    topics: { type: [String], default: [] },
    subTopics: { type: [String], default: [] }
  }],
  examPattern: { type: String, default: '' },
  totalQuestions: { type: Number },
  totalMarks: { type: Number },
  duration: { type: String, default: '' },
  negativeMarking: { type: String, default: 'None' },
  examMode: { type: String, enum: ['Online CBT', 'Offline OMR', 'Both'], default: 'Online CBT' },
  selectionStages: { type: [String], default: [] },
  sourceUrl: { type: String, default: '' },
  lastVerifiedDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('ExamSyllabus', ExamSyllabusSchema);

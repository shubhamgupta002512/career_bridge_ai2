const mongoose = require('mongoose');

const CareerRecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  recommendedRoles: {
    type: [String],
    default: []
  },
  skills: {
    type: [String],
    default: []
  },
  skillGaps: {
    type: [String],
    default: []
  },
  roadmap: {
    type: Array, // Could be structured as [{ month: 1, topics: ['HTML', 'CSS'] }]
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CareerRecommendation', CareerRecommendationSchema);

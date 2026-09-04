const ExamSyllabus = require('../models/ExamSyllabus');

// @desc    Get syllabus by exam ID
// @route   GET /api/exam-preparation/:examId
// @access  Public
exports.getSyllabusByExamId = async (req, res) => {
  try {
    const syllabus = await ExamSyllabus.findOne({ examId: req.params.examId });
    if (!syllabus) {
      return res.status(404).json({ message: 'Syllabus not found for this exam' });
    }
    res.status(200).json(syllabus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

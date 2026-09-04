const express = require('express');
const router = express.Router();
const { getSyllabusByExamId } = require('../controllers/syllabusController');

router.route('/:examId').get(getSyllabusByExamId);

module.exports = router;

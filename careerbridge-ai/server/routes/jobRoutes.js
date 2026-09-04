const express = require('express');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  saveJob,
  unsaveJob,
  getSavedJobs
} = require('../controllers/jobController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/saved').get(protect, getSavedJobs);

router
  .route('/')
  .get(getJobs)
  .post(protect, createJob);

router
  .route('/:id')
  .get(getJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

router
  .route('/:id/save')
  .post(protect, saveJob)
  .delete(protect, unsaveJob);

module.exports = router;

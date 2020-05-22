const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const axios = require('axios');
const { check, validationResult } = require('express-validator')

let encoding = require('encoding-japanese');
let Parser = require('rss-parser');
let parser = new Parser();

const Job = require('../../../models/Job');
const Employer = require('../../../models/Employer');

// @route   GET /api/jobs
// @desc    Get All global Jobs
// @access  public
router.get('/', async (req, res) => {

  try {
    await Job.find().sort({ date: -1 })
    .then(response => res.json(response))
    .catch(err => res.status(500).send('Server Error!'));
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error!');
  }
});

// @route   POST /api/jobs/post-job
// @desc    Post/Update a Job
// @access  public
router.post('/post-a-job', [auth, [
  check('title', 'Job title is required!').not().isEmpty(),
  check('location', 'Job location is required!').not().isEmpty(),
  check('job_type', 'Job type is required!').not().isEmpty(),
  check('education_level', 'Education level is required!').not().isEmpty(),
  check('experience_level', 'Experience level is required!').not().isEmpty(),
  check('details', 'Job description is required!').not().isEmpty(),
  check('application_type', 'Application choice is required!').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {

    const {
      title,
      application_type,
      application_email,
      application_url,
      location,
      job_type,
      education_level,
      experience_level,
      working_hours,
      details,
      posted,
      update,
      id
    } = req.body;

    const new_job = {};
    new_job.company = req.user.id;

    if(title) new_job.title = title;
    if(location) new_job.location = location;
    if(job_type) new_job.job_type = job_type;
    if(education_level) new_job.education_level = education_level;
    if(experience_level) new_job.experience_level = experience_level;
    if(working_hours) new_job.working_hours = working_hours;
    if(details) new_job.details = details;
    if(application_type) {
      new_job.application_type = application_type;
      if (application_type === 'url' && application_url) new_job.application_url = application_url;
      if (application_type === 'email' && application_email) new_job.application_email = application_email;
    }
    if(posted) new_job.posted = posted;

    if(update && id) {
      job = await Job.findOneAndUpdate(
        { _id: id },
        { $set: new_job },
        { new: true }
      );
      res.json(job);
      return;
    }

    job = new Job(new_job);
    await job.save();

    res.json(job);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require("express-validator")

const User = require('../../models/Users');

// @route   GET /api/users
// @desc    Register user
// @access  public
router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 7 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {name, email, password} = req.body;

  try {
    // See If user exists
    let user = await User.findOne({ email });
    if(user){
      return res.status(400).json({ erros: [{msg: 'User already exists'}] });
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    user = new User({ name, email, password, avatar });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save()

    // return jwt
    res.send('User Registered!');
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error!');
  }

});

module.exports = router;

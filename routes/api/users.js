const express = require("express");
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const router = express.Router();

// @router get api/users
// @desc    Test router
// @access  Public
router.post(
  "/",
  check("name", "Name is required").not().isEmpty(),
  check("email", "please included a valid email").isEmail(),
  check("password", "password with min 6 word").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // if users exists

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Get users gravatar

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonWebToken

      const payload = {
        user: {
          id: user.id,
        }
      }

      jwt.sign(payload, config.get('jwtSecret') , {
        expiresIn: 360000
      } , (err , token)=>{

        if(err){
          throw err;
        }
        res.json({token});
      });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;

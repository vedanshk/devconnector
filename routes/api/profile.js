const express = require(
  'express'
);

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @router get api/profile
// @desc    Get Current users profile
// @access  Public
router.get('/me', auth, async (req, res) => {

  try {

    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There no profile for this user' })
    }

    res.json({ profile });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


}

);

router.post("/me", [auth, [check('status', 'Status should not be empty').not().isEmpty(),
check('skills', 'Skill should not be empty').notEmpty()
]], async (req, res) => {

  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };


  const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

  console.log(skills , status)

  const profileFields = {};

  profileFields.user = req.user.id;
  if(company) profileFields.company = company;
  if(website) profileFields.website = website;
  if(location) profileFields.location = location;
  if(bio) profileFields.bio = bio;
  if(githubusername) profileFields.githubusername = githubusername;
  if(status) profileFields.status = status;
  
  if(skills){

     profileFields.skills = skills.split(',').map( skill => skill.trim());
     console.log(profileFields.skills);
  }

  profileFields.social = {}

  if(youtube) profileFields.social.youtube = youtube;
  if(twitter) profileFields.social.twitter = twitter;
  if(facebook) profileFields.social.facebook = facebook;
  if(linkedin) profileFields.social.linkedin = linkedin;
  if(instagram) profileFields.social.instgram = instagram;
  

  try{

    let profile = await Profile.findOne({user: req.user.id});
    if(profile){
       profile = await Profile.findOneAndUpdate({user:req.user.id} , {$set: profileFields} , { new :true})

     return res.json({profile});
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json({profile});


  }catch(err){
  
    console.error(err.message);
    res.status(500).send("Internal Server Error");
    
  }

});

// @router get api/profile/
// @desc    Get  all profile

// @access  Public
router.get('/' , async(req , res)=>{

  try {
    const profile = await Profile.find().populate('user' , ['name' , 'avatar']);

    res.json(profile);

  } catch (error) {
    
    console.error(error.message);
    res.status(500).send("Internal Server Error");

  }


});
// @router get api/profile/
// @desc    Get profile using userid 

// @access  Public
router.get('/user/:user_id' , async(req , res)=>{

  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user' , ['name' , 'avatar']);

    if(!profile){
      return res.status(400).json({msg: 'There is no profile for this user'});
    }

    res.json(profile);
                           
  } catch (error) {
    
    console.error(error.message);
    res.status(500).send("Internal Server Error");

  }

});




module.exports = router;
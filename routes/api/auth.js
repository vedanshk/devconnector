const express = require(
    'express'
    );
    const User = require('../../models/User');
    const auth = require("../../middleware/auth");

    const router = express.Router();
    
    // @router get api/auth
    // @desc    Test router
    // @access  Public
    router.get('/' , auth , async (req , res)=>
    {
     

      try{

        const user = await User.findById(req.user.id).select('-password');

        res.json(user);


      }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
      res.json({user});
    
    }
    )
    
    
    module.exports = router;
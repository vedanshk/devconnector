const express = require(
    'express'
    );
    
    const router = express.Router();
    
    // @router get api/post
    // @desc    Test router
    // @access  Public
    router.get('/' , (req , res)=>
    {
      res.send("Post router");
    
    }
    )
    
    
    module.exports = router;
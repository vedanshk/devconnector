const express = require(
    'express'
    );
    
    const router = express.Router();
    
    // @router get api/auth
    // @desc    Test router
    // @access  Public
    router.get('/' , (req , res)=>
    {
      res.send("Auth router");
    
    }
    )
    
    
    module.exports = router;
const express = require("express");
const { createSingleUser, loginUser } = require("../Controllers/Controllers");
const router = express.Router();
const passport = require("passport");
require("../Config/passport");

router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(passport.initialize());

// register route 
router.post("/register/user",createSingleUser);

//login user
router.post("/login/user",loginUser);

//profile 
router.get('/profile',
     passport.authenticate('jwt', { session: false }),
    (req, res)=> 
    {
        res.status(200).send 
        (
            {
                success : true,
                message : "authorized",
                status : 200  ,
                email : req.user.email      
            }
        )
    }
);



module.exports = router;
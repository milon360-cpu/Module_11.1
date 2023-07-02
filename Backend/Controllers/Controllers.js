const userSchema = require("../Models/Models");
require("dotenv").config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// create single user 
exports.createSingleUser = async(req,res)=>
{
    const user = await userSchema.findOne({email : req.body.email});

    try 
    {
       if(!user)
       {
            bcrypt.hash(req.body.password, saltRounds,async (err, hash)=>
            {
                const newUser = new userSchema
                (
                    {
                        email : req.body.email,
                        password : hash
                    }
                )
                await 
                newUser.save()
                .then(()=>
                {
                    res.status(201).send
                    (
                        {
                            success : true,
                            message : "create single user successfully",
                            status : 201,
                            data : newUser
                        }
                    )
                })
                .catch((err)=>
                {
                    res.status(401).send
                    (
                        {
                            success : false,
                            message : err.message,
                            status : 401,
                            data : newUser.email
                        }
                    )
                })
            });
       } 
       else 
       {
            res.status(401).send
                    (
                        {
                            success : false,
                            message : "user already exist",
                            status : 401,
                            data : req.body.email
                        }
                    )
       }
    } 
    catch (error) 
    {
        res.status(401).send
                (
                    {
                        success : false,
                        message : error.message,
                        status : 401,
                    }
                )
    }
}

// login user 
exports.loginUser = async(req,res)=>
{
    const user = await userSchema.findOne({email : req.body.email});
    try 
    {
        if(user)
        {

            bcrypt.compare(req.body.password, user.password, async(err, result)=>
            {
               if(result)
               {
                 const payload = 
                 {
                    id : user._id,
                    email : user.email
                 }

                //  jwt here 
                 const token = jwt.sign(payload, process.env.SEC_KEY,
                    {
                        expiresIn: "1d"
                    })
                 res.status(200).send 
                 (
                    {
                        success : true,
                        message : "Authorized user",
                        status : 200,
                        data : 
                        {
                            email : user.email,
                            token : "Bearer "+token
                        }
                    }
                 )
               }
               else 
               {
                    res.status(401).send 
                    (
                    {
                        success : false,
                        message : "incorrect password",
                        status : 401,
                        data : 
                        {
                            email : user.email
                        }
                    }
                    )
               }
            });
        }
        else 
        {
            res.status(401).send 
            (
                {
                    success : false,
                    message : "invalid email",
                    status : 401,
                    data : 
                    {
                        email : req.body.email
                    }
                }
            )
        }
    }
    catch (error) 
    {
        res.status(401).send 
            (
                {
                    success : false,
                    message : error.message,
                    status : 401,
                    data : 
                    {
                         email : user.email
                    }
                }
            )
    }
}
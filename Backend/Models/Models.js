const mongoose = require("mongoose");

const userSchema = mongoose.Schema
(
    {
        email:
        {
            type : String,
            required : [true, "Email is required"],
            unique : true,
            trim : true,
            validate:
            {
                validator : (v)=>
                {
                    const validEmailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    return validEmailExpression.test(v) 

                },
                message : (props)=> `${props.value} is not a valid email`
            }
        },
        password :
        {
            type : String,
            required : [true, "Password is required"],
        },
        createdOn:
        {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model("userSchema",userSchema);
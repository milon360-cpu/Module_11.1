const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;

// DB connection 
mongoose.connect(url)
.then(()=>
{
    console.log("DB is connected");
})
.catch((err)=>
{
    console.log(err.message);
    process.exit(1);
})
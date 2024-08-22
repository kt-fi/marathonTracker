const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()


const authRouter = require('./routers/authRouter');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
app.use(cors());
app.use(express.json());

app.use("/app", authRouter );

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://admin1:${process.env.MONGO_DB_PWD}@cluster0.ra3wn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { 
    //OPTIONS
})



app.listen(process.env.PORT, ()=> {
    console.log("Server Started on 3001");
})
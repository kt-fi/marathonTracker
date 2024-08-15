const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()


const authRouter = require('./routers/authRouter')

const app = express();

app.use(cors());
app.use(express.json());

app.use("/app", authRouter );

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://admin1:rangers20001@cluster0.ra3wn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { 
    //OPTIONS
})



app.listen(3001, ()=> {
    console.log("Server Started on 3001");
})
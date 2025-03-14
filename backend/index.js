const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const EventRouter = require('./Routes/EventRouter');
const TeamRouter = require('./Routes/TeamRouter');
const CommunityRouter = require('./Routes/CommunityRouter');
const path = require("path");
require('dotenv').config();
require('./Models/db');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth' , AuthRouter);
app.use('/events' , EventRouter);
app.use('/team' , TeamRouter);
app.use('/community' , CommunityRouter);
app.use("/uploads", express.static(path.join(__dirname, "/files")));
app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`)
})
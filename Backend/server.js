require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Path = require('path');
const authRouter = require('./routes/authRouter');
const InterviewRouter = require('./routes/interviewRouter');
// const {resume, jobDescription, selfDescription} = require('./services/temp')

// require('./services/ai.service')({resume, jobDescription, selfDescription});
const connectDB = require('./config/db');
connectDB();


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(Path.join(__dirname + "public")));

app.use('/api/auth', authRouter);
app.use('/api/interview', InterviewRouter);
app.get('/', (req, res) => {
    res.send("Express Server");
})


const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express Server Running at : ${PORT} ✔`);
});
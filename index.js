require('dotenv').config();

const db_URL = process.env.DATABASE_URL
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const UsersRoute = require('./routes/usersRoute')



const mongoose = require('mongoose');
mongoose.connect(db_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', error => console.log(error))
db.on('open', () => console.log("Connected to Mongoose"));

app.use(express.json());


app.use('/users', UsersRoute);

app.listen(process.env.PORT || 8000)
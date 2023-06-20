const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const express = require('express');

//load env vari.
dotenv.config({path:'./config/config.env'});
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
//Routing
app.use('/api/v1/stores' , require('./routes/stores'));

//static folder
app.use(express.static(path.join(__dirname , 'public')));
























const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` ));
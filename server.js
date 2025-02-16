const express = require ('express')
const  cors = require('cors')
const mongoose =require('mongoose');
require('dotenv').config()
const taskRoutes = require('./routess/tasks')
const app = express()

app.use(cors());
app.use(express.json())

//routes
app.use('/tasks',taskRoutes)


//database connection
mongoose.connect(process.env.MONGO_URI ,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('database connected'))
.catch (err=>console.error ('mongo connection error',err));
//Port
const PORT= process.env.PORT || 5000;
app.listen (PORT,()=>console.log(`server running on port ${PORT}`))
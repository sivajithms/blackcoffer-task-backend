const express = require('express')
const mongoose =require('mongoose')
const cors = require('cors')
const App=express()

const data = require('./config/connection')

//db connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://0.0.0.0:27017/blackcoffer',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
if(db)
console.log('db connected');

//middlewares
App.use(cors())
App.use(express.json())

//routes
App.get('/data',(req,res)=>{
  console.log('get request')
 
  data.find().then(result=>{    
      res.status(200).json({msg:"successfull",result})
      // res.json(result)
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({msg:"Error Occured"})
  })
})

//server
App.listen(5000,()=>{
  console.log('serever connected on port 5000')
})
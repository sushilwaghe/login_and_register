const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config({path:'../secure.env'});
const Port = process.env.Port;
require('./mongo');
app.use(cors());
app.use(require('./routers/routes'));










// app.post('/register',(req,res)=>{
//   // const name = req.body.name;
//   // res.send('Data Received');
//   res.json({message:req.body})
//   console.log(req.body);
// })


app.listen(Port,()=>{
  console.log(`Server running on port no ${Port}`);
})
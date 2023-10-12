const mongoose = require('mongoose');
const uri = "mongodb+srv://sushil:mearntask@cluster0.itrkwle.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri).then(()=>{
  console.log('Connected to Database');
}).catch((err)=>{
  console.log("Not Connected",err);
})
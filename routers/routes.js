const express = require('express');
const router = express.Router();
const bp = require('body-parser');
const bodyParser = bp.json();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../mongo');
const User = require('../models/userSchema');


router.get('/',(req,res)=>{
  res.send('Hello World from Server');
})




//Using async/ await

router.post('/register',bodyParser, async (req,res)=>{
  const {name, dob, email, password} = req.body;
  if(!name || !dob || !email || !password){
    return res.json({Error:"Please Filled All Field"});
  }
  try{
    const userExist = await User.findOne({email:email});
    if(userExist){
      return res.status(201).json({message:"User Exists"});
    }else{
      const user = new User({name, dob, email, password});
      await user.save();
      return res.status(200).json({message:"User Registered"});
        }
  }catch(err){
    res.status(301).json({message:"Unable to create new Entry, Please try after some time..."})
  }
})

router.post('/signin',bodyParser, async (req,res)=>{

  try{
    let token;
    const {email,password}= req.body;
    if(!email || !password){
      res.status(201).json({Message:"Please Filled All Field"});
    }
    const userLogin = await User.findOne({email:email});
    if(userLogin){
      const isMatch = await bcrypt.compare(password,userLogin.password);
      if(isMatch){
        token = await userLogin.generateAuthToken();
        res.status(200).json({Message:"Login Successfull",token:token});
      }else{
        res.status(201).json({Error:"Invalid Credential"});
      }
    }
    else{
      res.status(201).json({Error:"Invalid Credential"});
    }
  }catch(err){
    console.log(err);
  }
})

router.get('/users',async (req,res)=>{
  try {
    const users = await User.find({},'name dob email'); 
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(201).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
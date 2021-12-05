import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcrypt";


const Router = express.Router();

//Register

Router.post("/register" , async (req, res)=>{
   
    try {
        //generater new password 
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create  new user 
        const newUser =new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })
        //save user and send respond 
      const saveduser = await  newUser.save()
      res.status(200).json(saveduser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//login

Router.get("/login", async (req , res) =>{
    try{
        //finde user
        const currentUser = await User.findOne({username:req.body.username})
          !currentUser && res.status(400).json('wrong user name or password')
          
       
          const validPassword =bcrypt.compare(req.body.password, currentUser.password)
          !validPassword && res.status(400).json('wrong user name or password')
                    
          res.status(200).json({_id:currentUser._id , username:currentUser.username})
              
    }catch(error){
        res.status(500).json(error)

    }
})
export default Router;
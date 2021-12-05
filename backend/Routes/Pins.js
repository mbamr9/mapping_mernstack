import express from "express";
import Pin from "../Models/Pin.js";

const Router = express.Router();

//create pin 

Router.post("/" , async (req, res)=>{
    const newPin =new Pin(req.body)
    try {
      const savedPin = await  newPin.save()
      res.status(200).json(savedPin)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all pins 

Router.get("/" , async (req , res)=>{
    try {
       const allPis =  await Pin.find({});
       res.status(200).json(allPis)

    } catch (error) {
        res.status(500).json(error)
    }
})



export default Router;
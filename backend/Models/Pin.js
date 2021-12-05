import  mongoose  from "mongoose";


const PinSchema = new  mongoose.Schema({
    username:{
      type:String,
      require:true,

    },
    titie:{
        type:String,
        require:true,
        min:3,
      },
      desc:{
        type:String,
        require:true,
        min:0,
        max:50,
  
      },
      lat:{
         type:Number,
         require:true,

      },
      long:{
        type:Number,
        require:true,

      },



},{timestamps:true})

export default mongoose.model("Pin" , PinSchema)
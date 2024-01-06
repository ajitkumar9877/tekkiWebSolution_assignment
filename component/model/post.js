const mongoose=require('mongoose');
const postModel=mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    authorPost:{
       type:String,
    },
    createdBy:{
     type:mongoose.Schema.ObjectId,
     ref:"myData"
        
    }
})
module.exports=mongoose.model("post",postModel)
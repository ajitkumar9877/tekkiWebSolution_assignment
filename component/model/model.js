const mongoose=require('mongoose');
const struct=mongoose.Schema({
    firstName:{
        type:String,

    },
    lastName:{
        type:String,
    },
    gmail:{
        type:String,
    },
    password:{
        type:String,
    },
    author:{
       type:String,
    }
});
module.exports=mongoose.model("myData",struct);
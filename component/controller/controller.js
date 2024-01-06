const mongoose=require('mongoose');
const struct=require('../model/model')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const user={};
user.register=async(req,res)=>{
const data=req.body;
const find=await struct.findOne({gmail:data.gmail})
if(!find){
    const salt= await bcrypt.genSalt(10);

    const bcryptpassword= await bcrypt.hash(data.password,salt)
     data.password=bcryptpassword;
    const save=await struct.create(data);
    console.log(save);
    if(save){
        res.send({
            msg:"user data has been store"
        })
    }else{
        res.send({
            msg:"user data not store"
        })
    }
}else{
    res.send({
        msg:"user allready exist in our database"
    })
}
};


user.login=async(req,res)=>{
    try{
    const data=req.body;
    const find=await struct.findOne({gmail:data.gmail});
    if(find){
        const save=bcrypt.compare(find.password,data.password);

       if(save){
          const token=jwt.sign({id:find.id},"1111")
        res.send({
            msg:"user login",
            token:token,
            password:find
        })
       }else{
        res.send({
            msg:"plz enter correct password"
        })
       }
    }
    else{
      res.send({
        msg:"user not register"
      })
    }
}catch(err){
    console.log(err);
}
};
module.exports=user;
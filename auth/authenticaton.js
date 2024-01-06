const user=require("../component/controller/controller");
const jwt=require('jsonwebtoken');
const struct=require('../component/model/model')



const middelware={}
middelware.auth=async(req,res,next)=>{
    const data=req.headers;
    console.log(data.token)
    const tokenVerifyed= jwt.verify(data.token,'1111');
    req.id=tokenVerifyed.id;
    console.log(req.id);
    next();
    
}
module.exports=middelware;
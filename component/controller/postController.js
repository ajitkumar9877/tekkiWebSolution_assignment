const middelware = require("../../auth/authenticaton");
const postModel=require("../model/post");
const struct =require('../model/model')
const post={};
try{
post.postData=async(req,res)=>{
    const data=req.body;
    console.log(data);
    data.createdBy=req.id;
    const save= await postModel.create(data);
    if(save){
        res.send({
            msg:"User Successfully Post Blog",
            data:save
        
        })
    }
}
}catch(err){
    console.log(err);
};






post.getData=async(req,res)=>{
    console.log(req.id)
    

    const find= await postModel.find({createdBy:req.id }).populate("createdBy");
    console.log(find);
 

     if(find){
         res.send({
             Data:find
         })
 
     }else{
         res.send({
          msg:"user post not avaliable"
         }) 
     }
     
    
 
 };





 post.updateData = async (req, res) => {
    try {
        const postId = req.params.id; // Assuming the post ID is part of the request URL, adjust accordingly

        const updateFields = req.body;
        console.log(updateFields);

        const updatedPost = await postModel.findByIdAndUpdate(postId, updateFields, { new: true });

        if (updatedPost) {
            res.send({
                msg: "Post Successfully Updated",
                data: updatedPost
            });
        } else {
            res.status(404).send({
                msg: "Post not found"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            msg: "Internal Server Error"
        });
    }
};




post.delete=async(req,res)=>{
    try{
        const blogPostId = req.params.id;
   
    const result=await postModel.findOneAndDelete(blogPostId);
   
    if(result){
        res.send({
            msg:"user data deleted"
        })
    }
    else{
        res.send({
            msg:"user data not exist"
        })
    }
}catch(err){
   message:err.message
}

};














 post.check=async(req,res)=>{
 const result=await postModel.aggregate([
    { $lookup:
        {
           from: "mydatas",
           localField: "createdBy",
           foreignField:"_id",
           as: "result"
        }
    },
    {
        $unwind:"$result"
    }

])
return res.send({data:result})
  
 }

 
module.exports=post;
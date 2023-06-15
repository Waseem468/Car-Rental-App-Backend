const carModel = require("../Model/CarSchema")
const AdminModel = require("../Model/AdminSchema");
require("dotenv").config();
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const {GridFSBucket, MongoClient} = require("mongodb");
const { model } = require( "mongoose" );
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY



//we use this url for getting car images from db
let dbConnection = new MongoClient(process.env.DB_URL);
const getImagesFromDb = async(req,res)=>{
    try {
        await dbConnection.connect();
        const databaseUsed = dbConnection.db(process.env.DATABASE);
        const BucketName = new GridFSBucket(databaseUsed,{bucketName:process.env.CAR_COLLECTION});
        const eventVar= BucketName.openDownloadStreamByName(req.params.image);
        eventVar.on("data",(data)=>{
            return res.write(data)
          })
          eventVar.on("error" ,(err)=>{
          return  res.status(400).write(err)
          })
          eventVar.on("end",()=>{
            return res.end()
          })
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


// get cars

const getCarsFromDb = async(req,res)=>{
    try {
        if(req.headers.authorization){
            const readData = await carModel.find();
            res.send(readData)
        }
     
    } catch (error) {
       res.status(400).json({message:error.message})
    }
   }

//  *************Post cars *****************//

const PostCarsInDb =  async(req, res)=>{
    try{
        if(req.headers.authorization){
            let userVar = jwt.verify(req.headers.authorization, SECRET_KEY)//id  //
            let data = new carModel({image:req.file.filename,AdminId:userVar._id,...req.body});
            let createData = await data.save();
            res.status(201).send(createData)
        }else{
            res.status(404).send({message:"Unothorized User"})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

//  Update car data by using its id//

const UpdateCarData = async(req,res)=>{
    try {
        if(req.headers.authorization){
        let userVar = jwt.verify(req.headers.authorization, SECRET_KEY)
        let _id =req.params.id;
        let car= await carModel.findOne({_id:_id});
         if(car){   
           if(userVar._id===car.AdminId){
                    if(req.file){
                        let updateData = await carModel.findByIdAndUpdate(_id,{image:req.file.filename,...req.body},{new:true});
                        res.send(updateData)
                    }else{
                        let updateData = await carModel.findByIdAndUpdate(_id,req.body,{new:true});
                        res.send(updateData)
                    }
              }else{
               res.status(401).send({message:"you can`t update the post"})
              }
         }else{
           res.status(401).send({message:"Invalid Data"}) 
         }}
        else{
           res.status(401).send({message:"unauthorized"}) 
        }

    } catch (error) {
        res.status(400).json({message:error.message})  
    }
}

const deleteCarData =  async(req,res)=>{
    try{
    if(req.headers.authorization){
       let userVar = jwt.verify(req.headers.authorization, SECRET_KEY)
       let _id =req.params.id;
     let car= await carModel.findOne({_id:_id});
     if(car){
       if(userVar._id===car.AdminId){//tokan id === user id
        
                    let deletedata = await carModel.findByIdAndDelete(_id);
                    res.send(deletedata)
                
          }else{
           res.status(401).send({message:"you can`t delete the post"})
          }
     }else{
       res.status(401).send({message:"Invalid Data"}) 
     }}
    else{
       res.status(401).send({message:"unauthorized"}) 
    }
}
    
    catch (error) {
        res.status(400).json({message:error.message})  
    }
}



const GetDataByAdminId = async(req,res)=>{
    try{
        const  AdminId= req.params.id;
       if(req.headers.authorization){
            const readData = await carModel.find({AdminId:AdminId});
            res.send(readData)
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}





module.exports = {
    getImagesFromDb,
    getCarsFromDb,
    PostCarsInDb,
    UpdateCarData,
    deleteCarData,
    GetDataByAdminId
};

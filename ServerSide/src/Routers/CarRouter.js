const express = require("express");
const Router = express.Router();
const { getImagesFromDb, getCarsFromDb, PostCarsInDb, UpdateCarData, deleteCarData, GetDataByAdminId
} = require('../Controller/CarController');
require("dotenv").config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket, MongoClient } = require("mongodb");
const { model } = require("mongoose");


// We Use Multer for add Images

const storage = new GridFsStorage({
    url: process.env.DB_URL + process.env.DATABASE,
    file: (req, file) => {
        return {
            bucketName: process.env.CAR_COLLECTION,
            fileName: `${Date.now()}_${file.originalname}`
        }
    }
})
const upload = multer({
    storage
})

const middleware = upload.single("image")

// different Routes for cars //

Router.get('/:image', getImagesFromDb)

Router
    .route('/')
    .get(getCarsFromDb)
    .post(middleware, PostCarsInDb)



Router
    .route('/:id')
    .put(middleware, UpdateCarData)
    .delete(deleteCarData)

Router.get("/:id", GetDataByAdminId)


module.exports = Router;

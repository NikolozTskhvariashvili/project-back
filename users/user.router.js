const { Router } = require("express");
const userModel = require("../models/user.model");
const { isValidObjectId } = require("mongoose");

const usersRouter = Router()

usersRouter.get('/' , async(req,res)=>{
    const users = userModel.find()
    res.json(users)
})


module.exports = usersRouter
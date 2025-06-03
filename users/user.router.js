const { Router } = require("express");
const userModel = require("../models/user.model");
const { isValidObjectId } = require("mongoose");

const usersRouter = Router()

usersRouter.get('/' , async(req,res)=>{
    const users = await userModel.find().populate('links' ,'link platform')
    res.json(users)
})

usersRouter.get('/:id', async(req,res)=>{
    console.log("first")
    const {id} = req.params
    if(!isValidObjectId(id)) return res.status(400).json({error:'invalid id'})
    const user = await userModel.findById(id)
    res.json(user)
})

module.exports = usersRouter
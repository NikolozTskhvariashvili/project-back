const { Router, json } = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword)
    return res.status(400).json({ error: "fiels are required" });

  const existUser = await userModel.findOne({ email: email.toLowerCase() });
  if (existUser)
    return res.status(400).json({ error: "this email is already registred" });
  if (password !== confirmPassword)
    return res.status(400).json({ error: "password is incorrect" });
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({ email, password: hashedPassword });
  res.status(201).json({ message: "user created succsesfully" });
});

authRouter.post('/sign-in', async(req,res)=>{
    const {email,password}= req.body
    if(!email || !password) return res.status(400).json({error:'field are required'})
    const existUser = await userModel.findOne({email: email.toLowerCase()}).select('password')
    if(!existUser) return res.status(400).json({error:"email or passwrod  is incorrect"})
    
    const isPassed = await bcrypt.compare(password , existUser.password)
    if(!isPassed) return res.status(400).json({error:'email or passwrod  is incorrect'})

        const payload = {
            userId: existUser._id
        }
        const accsesToken = jwt.sign(payload, process.env.JWT_SECRET , {expiresIn:'1h'})
        res.json(accsesToken)
})


module.exports = authRouter;

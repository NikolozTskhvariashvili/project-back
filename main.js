const express = require("express");
const connectToDB = require("./config/connectToDB");
const usersRouter = require("./users/user.router");
const linksRouter = require("./links/link.router");
const authRouter = require("./auth/auth.router");
const isAuth = require("./middlewares/isAuth.middleware");
const cors =require('cors')
const app = express();
app.use(express.json());
app.use(cors())

connectToDB();

app.use('/auth', authRouter)
app.use('/user' , usersRouter)
app.use('/links' , isAuth , linksRouter)


app.listen(4000, () => {
  console.log("server is runnig on http://localhost:4000");
});

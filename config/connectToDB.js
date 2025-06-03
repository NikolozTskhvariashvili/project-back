const { default: mongoose } = require("mongoose")
require('dotenv').config()

module.exports = async()=>{
    try{
        await mongoose.connect(process.env.MOGNO_URL)
        console.log('connected succsesfully to DB')
    }catch(e){
        console.log('coudnot connect to db')
    }
}
/**
 * author:Rajpal Singh Dodiya
 */
const mongoose=require("mongoose")
require('dotenv').config();


/**
 * this connect method is responsible for setting connection with mongodb atlas server
 * @returns true if connection established else will return false
 */
exports.connect=async()=>{

try {        
  var connectionStatus=await mongoose.connect("mongodb+srv://"+process.env.NAME+":"+process.env.PASSWORD+"@cluster0.zc6zm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

if(connectionStatus)return true
else return false
    }
catch(error){
        // todo 
        //add logging for error
        console.log(error)
        return false
        
    }
}
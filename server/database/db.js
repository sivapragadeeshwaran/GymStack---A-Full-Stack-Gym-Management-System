
const mongoose = require('mongoose');

const Database = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
       console.log("database connected");
    }catch(e){
        console.log("Error : ", e);
    }
    
}

module.exports = Database;
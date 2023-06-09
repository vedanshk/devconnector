const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');


const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(db, {
            useNewUrlParser: true,
        });

        console.log("MongoDB connected");




    }catch(error){

        console.error(error.message);

        // exit process with failure
        process.exit(1);
    }
}


module.exports = connectDB;
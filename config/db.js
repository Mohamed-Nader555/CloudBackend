const mongoose = require('mongoose');


const initiateDBConnection  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URI)
        console.log('Connected to MOngo DB Server.');
    }catch (error){
        console.log(`Error connecting to MongoDB: ${error}`);
    }
}

module.exports = initiateDBConnection;
const mongoose = require('mongoose');
function DbConnect() {
    const DB_URL = process.env.MONGO_URL;
    // Database connection
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('DB connected');
    }).catch((err)=>console.log('DB not connected',err));
}

module.exports = DbConnect;
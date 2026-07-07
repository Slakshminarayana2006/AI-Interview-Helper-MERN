const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}`)
        .then(() => {
            console.log("Monogodb Successfully Connected")
        })
        .catch((err) => {
            console.log(err);
        })  
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

const mongoose = require('mongoose');

const {connect} = mongoose;

async function connectToDB (){

  try {
    await connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
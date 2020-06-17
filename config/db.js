const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async()=>
{
	try{
		mongoose.connect(db,{
		useNewUrlParser:true,
		useCreateIndex:true,
		useFindAndModify:false
	});
		console.log('Mongoose connected...');
	}
	catch(err){
		console.error(err.message);
		process.exit(1);
	}
	
};
module.exports = connectDB;
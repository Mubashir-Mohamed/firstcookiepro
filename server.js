const express = require('express')
const bodyParser=require('body-parser')
const app = express();
// const MongoClient = require('mongodb').MongoClient
const mongoose=require('mongoose')

// MongoClient.connect('127.0.0.1:27017/firstcrud',(err,database)=>{
// 	if(err)return console.log(err);
// 	db=database
// 	app.listen(3000,function(){
// 	console.log('listening on 3000')
// })

// })

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/firstcrud');

//creating a Schem/model

const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    quote: String
})

let User = mongoose.model('quotes', userSchema);


//create
app.post('/insert', (req, res) =>{
	let json_res ={
		error : true,
		message : "no_params received"
	};
	if( !req.body.hasOwnProperty('name') ||
		!req.body.hasOwnProperty('quote')){
			res.json(json_res);

		}

		let name = req.body.name;
		let quote = req.body.quote;
		console.log(quote);
		User.create({"name": name, "quote": quote}, (error, result)=> {
			if(error){
				json_res.message = "Invalid";
				res.json(json_res);
			}
			else{
				json_res.error = false;
				json_res.message= "success";
				res.json(json_res);

			}
		})
});


//find
app.post('/find', (req, res) =>{
	let json_res ={
		error : true,
		message : "no_params received"
	};
	if( !req.body.hasOwnProperty('name') ||
		!req.body.hasOwnProperty('quote')){
			res.json(json_res);

		}

		let name = req.body.name;
		let quote = req.body.quote;
		console.log(quote);
		User.find({"name": name, "quote": quote}, (error, result)=> {
			if(error){
				json_res.message = "Invalid";
				res.json(json_res);
			}
			else{
				json_res.error = false;
				json_res.message= "success";
				json_res.user_id= result[0]['_id'];
				res.json(json_res);

			}
		});

		//update
app.post('/update', (req, res) => {
	let json_res ={
		error : true,
		message : "no_params received"
	};
	if( !req.body.hasOwnProperty('name') ||
		!req.body.hasOwnProperty('quote')){
			res.json(json_res);

		}

		let name = req.body.name;
		let new_quote = req.body.quote;

		
		User.findOneAndUpdate({"name":name},{"quote":new_quote}, function(error, result) {
			if(error){
				json_res.message = "Invalid";
				res.json(json_res);
			}
			else{
				json_res.error = false;
				json_res.message= "success";
				res.json(json_res);

			}
		})
});
app.listen(3333);
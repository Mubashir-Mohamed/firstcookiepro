const express = require('express')
const mongoose = require('mongoose');
const app = express();


const cookieParser = require('cookie-parser');
const session = require('express-session');


mongoose.connect('mongodb://localhost/sessions');

app.use(cookieParser());
const MS = require('express-mongoose-store')(session, mongoose);
app.use(session({ 
	secret: 'keyboard cat',
	store: new MS( {ttl: 600000})
	})); //10 minute sessions


// app.use(session({secret: "Shh, its a secret!"}));




app.get('/', function (req, res) {

	
	let name = req.query.n;

	if(!req.session.names) {
		req.session.names = [];
	}

	req.session.names.push(name);

	res.send(req.session.names);

	// if(req.session.page_views){
 //      req.session.page_views++;
 //      req.session.names.push();

 //      res.send("You visited this page " + req.session.page_views + " times");
 //   	} else {
 //      req.session.page_views = 1;
 //      res.send("Welcome to this page for the first time!");
 //   	}


})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
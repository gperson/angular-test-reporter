var http = require('http');
var url = require('url');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	database : 'tests',
	user     : 'root',
	password : 'root',
});

function connectToDB() {
	connection.connect(function(err) {
		if (err) 
			console.log(err);
	})
}

function getTestObjects(){
	connection.query('SELECT * FROM tests', function(err, rows, fields) {
		if (err) 
			console.log(err);
		console.log('The first row is: ', rows[0]);
	})
}

function closeConnectionToDB(){
	connection.end(function(err) {
		if (err) 
			console.log(err);
	})
}

var server = http.createServer(function (request,response){
	console.log(url.parse(request.url).path);
	if(url.parse(request.url).path === "/getTestData"){
		connectToDB();
		getTestObjects();
		closeConnectionToDB();
		response.writeHead(200);
		response.write("Got data...")
		response.end();
	} else {
		response.writeHead(404);
		response.write("Invalid")
		response.end();
	}
});

server.listen(4968);
console.log("Server Started on port 4968");
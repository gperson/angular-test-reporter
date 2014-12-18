var http = require('http');
var url = require('url');
var mysql = require('mysql');

/**
 * Database connection
 */
var connection = mysql.createConnection({
	host     : 'localhost',
	database : 'tests',
	user     : 'root',
	password : 'root',
});

/**
 * Gets the 'test' objects from the database
 * @param response Response to write the test to
 * @param callback Function to map sub objects to the list of tests
 */
function getTestObjects(response ,callback){
	var tests = [];
	var query = connection.query("SELECT * FROM tests", function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			for(var i = 0; i < rows.length; i++){
				rows[i].notes = [];
				tests[i] = rows[i];
			}
		}
	});

	query.on('end',function(){
		if(callback){
			callback(response,tests);
		}
		else {
			response.write(JSON.stringify(tests));
			response.end();
		}
	});
}

/**
 * Gets the notes and adds them to the 'test' objects.
 * There is probably one query that could be ran to pull this info
 * into and object, to simplify code but only way I was skilled enough to  was 
 * first select 'tests' then manually add 'notes' to them with another
 * select statement. 
 * @param response Response to write the tests to
 * @param tests Array of tests from the DB
 */
function getAddNotesToTests(response, tests){
	var notes = [];
	var query = connection.query('SELECT * FROM notes', function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			for(var i = 0; i < rows.length; i++){
				notes[i] = rows[i];
			}
		}
	});

	query.on('end',function(){
		for(var i = 0; i < tests.length; i++){
			var test = tests[i];
			for(var j = 0; j < notes.length; j++){
				var note = notes[j];
				if(note.testId === test.id){
					test.notes[j] = note;
					tests[i] = test;
				}
			}
		}
		response.write(JSON.stringify(tests));
		response.end();
	});
}

/**
 * Adds a note to a test
 * @param response The response to send back
 * @param note Note object to add
 */
function addNote(response, note){
	var query = connection.query("INSERT INTO notes (testId,who,note) VALUES ("+note.testId+",'" + note.who + "','"+note.note+"')", function(err, rows, fields) {
		if (err) {
			console.log(err);
		} else {
			
		}
	});

	query.on('end',function(){
		response.end();
	});
}

/**
 * Server, so far just handles request to /getTestData
 */
var server = http.createServer(function (request,response){
	if(url.parse(request.url).path === "/getTestData"){
		response.statusCode = 200;
		response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
		response.setHeader('Access-Control-Allow-Methods', 'GET');
		getTestObjects(response, getAddNotesToTests);
	} else if(url.parse(request.url).path === "/addNote"){
		response.statusCode = 200;
		response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
		response.setHeader('Access-Control-Allow-Methods', 'POST');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		var body = '';	
		request.on('data', function (data) {
			body += data;
		});		
		request.on('error', function(e) {
			console.log('Bad post');
			response.statusCode = 400;
			response.end();
		});		
		request.on('end', function () {
			//TODO Mysterious blank post is sent (below work around)
			if(body.length){
				addNote(response, JSON.parse(body));
			} else{
				response.end();
			}
		});
		
	}else {
		response.writeHead(404);
		response.write("Invalid")
		response.end();
	}
});

server.listen(4968);
console.log("Server Started on port 4968");
const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database(process.env.DATABASE);
const path = require('path');
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');


// Use this to parse the body of post requests
app.use(bodyParser.json())

// Use this to server static files from the 'static' directory
app.use('/static', express.static('static'))


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Our homepage---just send the index.html file
app.get('/', (req, res) => {
	// res.sendFile(path.join(__dirname, 'index.html'));
	res.render('todo', {tododata});
});

// Our API for getting chats
// app.get('/api/chats', (req, res) => {
// 	getChats(req.query.latest || 0, function(rows){
// 		res.send(rows);
// 	});
// });

const create_table = `
CREATE TABLE IF NOT EXISTS todo (
  id INTEGER PRIMARY KEY,
  body TEXT,
  is_complete BOOLEAN
)
`;


db.serialize(function() {
  db.run(create_table);
  db.run('INSERT INTO todo (body, is_complete) VALUES ("test",1)');
});

var tododata = db.run('SELECT * FROM todo');
	

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Our API for posting new chats

// app.post('/todo', (req, res) => {
// 	const todoinput = req.body.body;
// 	db.all('INSERT INTO todo (body) VALUES (?)', todoinput, function(err, rows){
// 		// Return a 500 status if there was an error, otherwise success status
// 		res.send(err ? 500 : 200);
// 	});
// });

// function getChats(latestID, cb){
// 	db.all('SELECT rowid,body,date FROM chats WHERE rowid > (?)', latestID, function(err, rows){
// 		cb(rows);
// 	});
// }






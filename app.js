#!/env/bin node

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 9000;
const VALIDATION_TOKEN = 'this_is_a_coursework';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/webhook', function(req, res) {
	console.log(JSON.stringify(req.query, null, 2));
	res.sendStatus(200);          
});


app.post('/webhook', function (req, res) {
	console.log(JSON.stringify(req.body, null, 2));
	res.sendStatus(200);  
});

server.listen(PORT, () => {
	console.log('Frontend server running on port ' + PORT)
});
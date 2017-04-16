#!/env/bin node

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const PORT = 9000;
const VALIDATION_TOKEN = 'this_is_a_coursework';
const PAGE_ACCESS_TOKEN = 'your_token';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.sendStatus(200);
});

app.get('/webhook', function(req, res) {
	if (req.query['hub.mode'] === 'subscribe' &&
		req.query['hub.verify_token'] === VALIDATION_TOKEN) {

    	console.log('Validating webhook');
    	res.status(200).send(req.query['hub.challenge']);
	} else {
		console.error('Failed validation. Make sure the validation tokens match.');
		res.sendStatus(403);
	}
});


app.post('/webhook', function (req, res) {
	const data = req.body.entry[0].messaging[0];
	const recipientId = data.sender.id;

	request({
	    uri: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: { access_token: PAGE_ACCESS_TOKEN },
	    method: 'POST',
	    json: {
		    recipient: {
		        id: recipientId
		    },
		    message: {
		        text: 'There are 3 people in the living room',
		        metadata: 'DEVELOPER_DEFINED_METADATA'
		    }
		}
	}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
			res.sendStatus(200);
	    } else {
	      console.error('Failed calling Send API', response.statusCode, response.statusMessage, body.error);
	    }
	  });
});

app.listen((process.env.PORT || PORT), () => {
	console.log('Frontend server running on port ' + (process.env.PORT || PORT))
});

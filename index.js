require('newrelic');
var cool = require('cool-ascii-faces');
// var sass = require('node-sass');
var express = require('express');
// var router = express.Router();
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors')

var algoliasearch = require('algoliasearch');
var client = algoliasearch('I2VKMNNAXI', '1a865896c07d9c08f3e2f14736e840bf');
var index = client.initIndex('emails');

app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public-beta'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

/* Temporary? */
app.get('/demo', function(request, response) {
  response.render('pages/demo');
});

app.get('/hello.html', function(request, response) {
  response.writeHead(301, {
    'Location': '/'
  });
  response.end();
});

app.get('/submit', function(request, response) {
  index.addObjects([{email: request.query.email}], function(err, content) {
    if (err) {
      console.error(err);
    }
    response.json({success: true})
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



//Facebook Chatbot

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'explain_the_news') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});


// sass.render({
//   file: 'views/scss.main.scss',
//   [, options..]
// }, function(err, result) { /*...*/ });
// OR
// var result = sass.renderSync({
//   file: 'views/scss.main.scss',
//   outFile: 'public/main1.css'
// });

var cool = require('cool-ascii-faces');
// var sass = require('node-sass');
var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
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

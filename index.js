var sendgrid  = require('sendgrid')(process.env.SENDGRID_KEY);
var express = require('express');
var parser = require('body-parser');

var app = express();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Origin', 'http://loopbacklab.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.use(parser.json());


app.post('/', function (req, res) {
  var params = req.body;
  sendgrid.send({
    to: 'kyle@loopbacklab.com',
    from: params.from,
    fromname: params.name,
    subject: 'New Potential Client: ' + params.name,
    text: params.text
  }, function(err, json) {

    // TODO: Send email receipt to sender saying thanks for contacting us, we'll get back shortly
    if (err) { return res.status(400).json(err); }
    res.sendStatus(204);
  });
});

console.log('Wassup World!');
app.listen(9000);

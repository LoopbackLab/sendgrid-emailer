var sendgrid  = require('sendgrid')(process.env.sendgrid || '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');
var express = require('express');
var parser = require('body-parser');

var app = express();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.use(parser.json());


app.post('/', function (req, res) {
  var params = req.body;
  console.log(params);
  sendgrid.send({
    to: 'kyle@loopbacklab.com',
    from: params.from,
    fromname: params.name,
    subject: 'New Potential Client: ' + params.name,
    text: params.text
  }, function(err, json) {
    if (err) { return res.sendStatus(400); }
    res.sendStatus(204);
  });
});

app.listen(process.env.PORT || 9000);

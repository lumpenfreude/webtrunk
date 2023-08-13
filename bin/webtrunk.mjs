import express from 'express';
import http from 'http';
import methodOverride from 'method-override';
import errorhandler from 'errorhandler';
import { wf, fingerizer } from '../lib/fingerizer.mjs'

var app = express();
var port = 9910;
var ip = '0.0.0.0';

app.set('port', process.env.PORT || port);
app.use(methodOverride());
app.use(fingerizer);

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

app.enable('trust proxy');

app.get('/', function (req, res) {
  res.send("webtrunk is chooglin");
});

app.get('/.well-known/host-meta', function (req, res) {
  wf.hostMeta(req, res);
});

app.get('/.well-known/host-meta.json', function (req, res) {
  wf.hostMeta(req, res);
});

app.get('/.well-known/webfinger', function (req, res) {
  wf.hostMeta(req, res);
});

http.createServer(app).listen(app.get('port'), ip, function () {
  console.log("webfinger service listening on port " + app.get('port'));
});

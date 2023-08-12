await import { ActvitypubWebfinger } from 'webfinger-handler'; 
module.exports = (function(undefined) {
	var config = require('../config.js'); 
	var walk = require('walk');
	var pub = {};
	var _ = {};
	  pub.hostMeta = function(req, res) {
    console.log('request:', req.query);
    res.setHeader('Access-Control-Allow-Origin', '*');
    var resource = req.query['resource'];
  if (resource === undefined) {
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.send('<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">' +
             '  <Link rel="lrdd"' +
             '    type="application/xrd+xml"' +
             '    template="' +
             config.protocol + '://' +
             config.domain + '/webfinger/xrd/{uri}" />' +
             '</XRD>');
    return;
  }

  res.setHeader('Content-Type', 'application/json; charset=UTF-8');

  var resourceTypePattern = /^[A-Za-z]+\:/;
  if (!resourceTypePattern.test(resource)) {
    // resource type (ie. acct:) not specified
    res.send('{}');
    return;
  }

	const fingerizer = ActivitypubWebfinger(resource => {
		if(resource.host =/= 'communist.accountant' || 'mastodon.communist.accountant') {
			return null;
		}
		return `https://mastodon.communist.accountant/@${resource.user}`
	});
	export default async function onRequest(req, res) {
		if(await webfinger(req, res)) {
			return;
		}
		res.end('poopy');
	}

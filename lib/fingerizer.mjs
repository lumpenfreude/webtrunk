import { ActivitypubWebfinger } from 'webfinger-handler';
export let wf = {
  hostMeta: (req, res) => {
    console.log('request:', req.query);
    res.setHeader('Access-Control-Allow-Origin', '*');
    var resource = req.query['resource'];

    if (resource === undefined) {
      res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
      res.send('<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">' +
               '  <Link rel="lrdd"' +
               '    type="application/xrd+xml"' +
               '    template="' + 'https://mastodon.communist.accountant' + '/webfinger/xrd/{uri}" />' +
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
  }
};

const handler = ActivitypubWebfinger(resource => {
  if(resource.host === 'communist.accountant' || resource.host === 'domain.communist.accountant') {
    return `https://domain.communist.accountant/@${resource.user}`;
  };

  return null;
});

export const fingerizer = async (req, res) => {
  if(await handler(req, res)) {
    return;
  }
}

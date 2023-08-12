import { ActivitypubWebfinger } from 'webfinger-handler';

const webfinger = ActivitypubWebfinger(resource => {
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

import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function proxy(req: NextApiRequest, res: NextApiResponse) {
	const { url } = req.query;

	if (!url) {
		res.status(400).json({ error: 'URL parameter is missing.' });
		return;
	}

	try {
		const response = await fetch(url as string, {
			headers: {
				'User-Agent': req.headers['user-agent'] ?? 'Next.js Proxy',
			},
		});

		const contentType = response.headers.get('content-type');
		if (contentType) {
			res.setHeader('Content-Type', contentType);
		}
		res.setHeader('Access-Control-Allow-Origin', '*');

		if (response.ok) {
			const data = await response.text();
			res.status(200).send(data);
		} else {
			res.status(response.status).json({ error: response.statusText });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

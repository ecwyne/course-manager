import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import cors from 'cors';

import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import schema from './api/graphql/schema.js';

// Dev mode?
const dev = process.env.NODE_ENV !== 'production';

// NextJS stuff.
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use(cors());
	server.use('/graphql', bodyParser.json(), cors(), graphqlExpress(req => ({
		schema,
		context: {}
	})));

	server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

	server.get('*', (req, res) => {
		const notAllowed = /\/components\/*/ig;
		if (notAllowed.test(req.url)) {
			return res.sendStatus(404);
		}

		return handle(req, res);
	});

	server.listen(3000, err => {
		if (err) {
			throw err;
		}

		console.log('> Server running at http://localhost:3000');
	});
});
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { InMemoryLRUCache } from 'apollo-server-caching';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import rootDataSources from 'data-sources/root-data-sources';
import express from 'express';
import jwt from 'express-jwt';
import session from 'express-session';
import rootPermissions from 'graphql/root-permissions';
import rootSchema from 'graphql/root-schema';
import { applyMiddleware } from 'graphql-middleware';
import helmet from 'helmet';
import { NotFound } from 'http-errors';
import errorHandler, { formatGraphQLError } from 'middlewares/error-handler';
import mongoose from 'mongoose';

import pkg from '../package.json';

(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
  }
  app.set('trust proxy', 1);
  app.use(
    session({
      name: 'sessionId',
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
    }),
  );
  app.use(cors());
  app.use(express.json());
  app.use(
    jwt({
      algorithms: ['HS256'],
      credentialsRequired: false,
      secret: process.env.JWT_SECRET,
    }),
  );

  const server = new ApolloServer({
    cache: new InMemoryLRUCache(),
    context: ({ req }) => ({
      accountId: req.user?.sub,
      timezone: req.headers.timezone,
    }),
    cors: true,
    dataSources: () => rootDataSources(mongoose),
    formatError: formatGraphQLError,
    schema: applyMiddleware(rootSchema, rootPermissions),
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: process.env.SERVER_PREFIX ? `/${process.env.SERVER_PREFIX}/graphql` : '/graphql',
  });

  app.get('*', () => {
    throw new NotFound();
  });

  app.use(errorHandler());
  app.use(compression());

  await new Promise(resolve => app.listen(process.env.SERVER_PORT, resolve));
  console.log(`${pkg.name} running on http://localhost:${process.env.SERVER_PORT}/`);
})();

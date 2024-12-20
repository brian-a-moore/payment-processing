import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import authorizationMiddleware from './middlewares/authorization.middleware';
import contextMiddleware from './middlewares/context.middleware';
import errorHandlingMiddleware from './middlewares/errorHandling.middleware';
import morganMiddleware from './middlewares/morgan.middleware';
import routeIdMiddleware from './middlewares/routeId.middleware';
import routes from './routes';

export const app = express();

app.use(cors());
app.use(morgan(morganMiddleware));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(contextMiddleware);
app.use(routeIdMiddleware);
app.use(authorizationMiddleware);

app.use('/', routes);

app.use(errorHandlingMiddleware);

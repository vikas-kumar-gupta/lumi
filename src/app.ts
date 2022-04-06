import { CONFIG } from './constants'
import express, {Request, Response, NextFunction, Application} from 'express';
import swaggerUi from 'swagger-ui-express'

import * as v1Route from './routes/index'

import connection from './config/db.config';
import { swaggerFunc } from './lib/swagger';

const port = CONFIG.PORT

const app: Application = express();

//  db connection
connection();

// express bodyParser
app.use(express.json());

// swagger  documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFunc()));

// mount paths
app.use('/user', v1Route.userRoute.default);
app.use('/', v1Route.noramlRoute.default);

app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
})
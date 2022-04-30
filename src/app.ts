import { CONFIG } from './constants'
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express'
import cookieParser from 'cookie-parser';
import { redis } from './db/redis.config'
import * as v1Route from './routes/index'

import connection from './db/db.config';
import { swaggerFunc } from './lib/swagger';

const port = CONFIG.PORT

const app: Application = express();

//  db connection
connection();

//  redish connection
redis.connect()

//  express bodyParser
app.use(express.json());
app.use(cookieParser()); -
app.use(express.static("uploads"))

//  swagger  documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFunc()));

//  admin mount paths
app.use('/admin', v1Route.adminRoute.default)
app.use('/admin/report', v1Route.adminReportRoute.default)
app.use('/admin/event', v1Route.adminEventRoute.default)
app.use('/admin/subscription', v1Route.adminSubscriptionRoute.default)

//  user mount paths
app.use('/user', v1Route.userRoute.default)
app.use('/user/event', v1Route.userEventRoute.default)
app.use('/user/match', v1Route.userMatchRoute.default)

//  common mount paths  
app.use('/', v1Route.noramlRoute.default)

app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
})
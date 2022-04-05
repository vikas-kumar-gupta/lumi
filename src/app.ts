import { CONFIG } from './constants'
import express, {Request, Response, NextFunction, Application} from 'express';

import connection from './config/db.config';
const app: Application = express();

const port = CONFIG.PORT;

//  db connection
// connection();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'welcome'})
})

app.get('/*', (req: Request, res: Response) => {
    res.status(404).json({message: 'page not found'})
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
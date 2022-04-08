import express from 'express'

import { eventController } from '../../controllers/'
import {auth} from '../../middlewares/user.middleware'

const routes = express.Router();

routes.get('/add', auth, eventController.addEvent);

export default routes;
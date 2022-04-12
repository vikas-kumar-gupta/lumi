import express from 'express'
import { adminEventController } from '../../../controllers/'

const routes = express.Router();

routes.post('/new-event', adminEventController.newEvent)
routes.patch('/new-event', adminEventController.updateEvent)
routes.delete('/new-event', adminEventController.deleteEvent)

export default routes;
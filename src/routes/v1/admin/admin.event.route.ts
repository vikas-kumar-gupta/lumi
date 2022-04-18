import express from 'express'
import { adminEventController } from '../../../controllers/'

const routes = express.Router();

routes.post('/new-event', adminEventController.newEvent)
routes.patch('/update-event/:eventId', adminEventController.updateEvent)
routes.delete('/delete-event/:eventId', adminEventController.deleteEvent)

export default routes;
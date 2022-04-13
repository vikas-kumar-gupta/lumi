import express from 'express'

import { userEventController } from '../../../controllers'
import {auth} from '../../../middlewares/user.middleware'

const routes = express.Router();

routes.get('/:eventId', auth, userEventController.eventDetails)
routes.get('/all-events', auth, userEventController.allEvents)                            
routes.get('/my-events', auth, userEventController.myEvents);
routes.post('/book-event/:eventId', auth, userEventController.bookEvent)

// CREATING TAGS
/**
 * @swagger
 * tags:
 *  name: Event                                                                     
 *  description: User Routes
 */

/**
 * @swagger
 * /event/all-events:
 *  get:
 *      summary: List of near location events
 *      tags: [Event]
 *      description: array of all the available events near users location.
 *      responses:
 *          200:
 *              description: Sucess
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */


export default routes;
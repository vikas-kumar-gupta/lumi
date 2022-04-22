import express from 'express'
import { userEventController } from '../../../controllers'
import { auth } from '../../../middlewares/user.middleware'

const routes = express.Router();

routes.get('/my-events', auth, userEventController.myEvents);
routes.get('/all-events', auth, userEventController.allEvents)                      
routes.get('/details/:eventId', auth, userEventController.eventDetails)

// !to be implement
routes.post('/book-event/:eventId', auth, userEventController.bookEvent)

// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: UserEvent                                                                     
 *  description: User Routes
 */

/**
 * @swagger
 * /user/event/all-events:
 *  get:
 *      summary: List of near location events
 *      tags: [UserEvent]
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

/**
 * @swagger
 * /user/event/my-events:
 *  get:
 *      summary: List of user booked events
 *      tags: [UserEvent]
 *      description: array of all the user booked events near users location.
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

/**
 * @swagger
 * /user/event/details/{eventId}:
 *  get:
 *      summary: Event Details
 *      tags: [UserEvent]
 *      description: All the data about a single ebent of the given event id
 *      parameters:
 *        - in: path
 *          name: eventId
 *          schema:
 *              type: string
 *          required: true
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
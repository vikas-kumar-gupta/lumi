import express from 'express'
import { userEventController } from '../../../controllers'
import { sessionAuth } from '../../../middlewares/session.middleware';
import { userAuth } from '../../../middlewares/user.middleware'

const routes = express.Router();


// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: UserEvent                                                                     
 *  description: User Routes
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
routes.get('/my-events', sessionAuth, userAuth, userEventController.myEvents);

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
routes.get('/all-events', sessionAuth, userAuth, userEventController.allEvents)

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
routes.get('/details/:eventId', sessionAuth, userAuth, userEventController.eventDetails)

/**
 * @swagger
 * /user/event/book-event/{eventId}:
 *  post:
 *      summary: Event Details
 *      tags: [UserEvent]
 *      description: All the data about a single ebent of the given event id
 *      parameters:
 *        - in: path
 *          name: eventId
 *          schema:
 *              type: string
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          paymentId:
 *                              type: string
 *                              required: true
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
routes.post('/book-event/:eventId', sessionAuth, userAuth, userEventController.bookEvent)

export default routes;
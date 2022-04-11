import express from 'express'

import { eventController } from '../../controllers/'
import {auth} from '../../middlewares/user.middleware'

const routes = express.Router();

routes.post('/add', auth, eventController.addEvent);
routes.get('/all-events', auth, eventController.allEvents)
//  booking to be implemented                                                                                   
routes.post('/:eventId/book', auth, eventController.bookEvent)                                                  
                              

// CREATING TAGS
/**
 * @swagger
 * tags:
 *  name: Event                                                                     
 *  description: User Routes
 */

/**
 * @swagger
 * /event/add:
 *  post:
 *      summary: Add new event on the map
 *      tags: [Event]
 *      description: An event is to be added by the admin on the map
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          createdBy:
 *                              type: object
 *                              required: true
 *                          eventName:
 *                              type: string
 *                              required: true
 *                          geometry:
 *                              type: object
 *                              required: true
 *                          eventDate:
 *                              type: date
 *                              required: true
 *                          eventDescription:
 *                              type: string
 *                              required: true
 *                          totalTickets:
 *                              type: number
 *                              required: true
 *                          availableTickets:
 *                              type: number
 *                              required: true
 *                          bookedTickets:
 *                              type: number
 *                              required: true
 *                          ageBetween:
 *                              type: [number]
 *                              required: true
 *                          freeDrinks:
 *                              type: number
 *                              required: true
 *                          price:
 *                              type: number
 *                              required: true
 *                          bookedBy:
 *                              type: object
 *                              required: true
 *                          eventImages:
 *                              type: [string]
 *                              required: true
 * 
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
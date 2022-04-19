import express from 'express'
import { adminEventController } from '../../../controllers/'
import {auth} from '../../../middlewares/admin.middleware'

const routes = express.Router();

routes.post('/new-event', auth, adminEventController.newEvent)
routes.patch('/update-event/:eventId', auth, adminEventController.updateEvent)
routes.delete('/delete-event/:eventId', auth, adminEventController.deleteEvent)

// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: AdminEvent                                                                     
 *  description: Admin Event Routes
 */

/**
 * @swagger
 * /admin/event/new-event:
 *  post:
 *      summary: Adding new event
 *      tags: [AdminEvent]
 *      description: Adding new event
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
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
 *                              example: [18, 23]
 *                          freeDrinks:
 *                              type: number
 *                              required: true
 *                          price:
 *                              type: number
 *                              required: true
 *                          eventImages:
 *                              type: [string]
 *                              required: false
 *                              example: [imgUrl1, imgUrl2]
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
 * /admin/event/update-event/{eventId}:
 *  patch:
 *      summary: Adding new event
 *      tags: [AdminEvent]
 *      description: Adding new event
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
 *                          eventName:
 *                              type: string
 *                              required: false
 *                          geometry:
 *                              type: object
 *                              required: false
 *                          eventDate:
 *                              type: date
 *                              required: false
 *                          eventDescription:
 *                              type: string
 *                              required: false
 *                          totalTickets:
 *                              type: number
 *                              required: false
 *                          availableTickets:
 *                              type: number
 *                              required: false
 *                          bookedTickets:
 *                              type: number
 *                              required: false
 *                          ageBetween:
 *                              type: [number]
 *                              required: false
 *                              example: [18, 23]
 *                          freeDrinks:
 *                              type: number
 *                              required: false
 *                          price:
 *                              type: number
 *                              required: false
 *                          eventImages:
 *                              type: [string]
 *                              required: false
 *                              example: [imgUrl1, imgUrl2]
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
 * /admin/event/delete-event/{eventId}:
 *  delete:
 *      summary: Adding new event
 *      tags: [AdminEvent]
 *      description: Adding new event
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
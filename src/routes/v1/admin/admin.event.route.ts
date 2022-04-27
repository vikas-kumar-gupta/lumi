import express from 'express'
import { adminEventController, userEventController } from '../../../controllers/'
import {adminAuth} from '../../../middlewares/admin.middleware'
import {sessionAuth} from '../../../middlewares/session.middleware'

const routes = express.Router();

routes.post('/new-event', sessionAuth, adminAuth, adminEventController.newEvent)
routes.get('/details/:eventId', sessionAuth, adminAuth, userEventController.eventDetails)
routes.patch('/update-event/:eventId', sessionAuth, adminAuth, adminEventController.updateEvent)
routes.delete('/delete-event/:eventId', sessionAuth, adminAuth, adminEventController.deleteEvent)

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
 *                          location:
 *                              type: object
 *                              required: false
 *                              properties:
 *                                  type:
 *                                      type: string
 *                                      example: "Point"
 *                                      require: true
 *                                  coordinates:
 *                                      type: [number]
 *                                      example: [-90.9009, 789.54546]
 *                                      require: true 
 *                          eventDate:
 *                              type: string
 *                              example: "01/01/2000"
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
 * /admin/event/details/{eventId}:
 *  get:
 *      summary: Event Details
 *      tags: [AdminEvent]
 *      description: Event Details
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

/**
 * @swagger
 * /admin/event/update-event/{eventId}:
 *  patch:
 *      summary: Update event
 *      tags: [AdminEvent]
 *      description: Update existing event of eventID
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
 *                          location:
 *                              type: object
 *                              required: false
 *                              properties:
 *                                  type:
 *                                      type: string
 *                                      example: "Point"
 *                                      require: true
 *                                  coordinates:
 *                                      type: [number]
 *                                      example: [-90.9009, 789.54546]
 *                                      require: true 
 *                          eventDate:
 *                              type: string
 *                              example: "01/01/2022"
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
 *      summary: Delete event
 *      tags: [AdminEvent]
 *      description: Delete an event of eventID
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
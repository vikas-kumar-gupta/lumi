import express from 'express'
import { adminSubscriberController } from '../../../controllers/index'
import { adminAuth } from '../../../middlewares/admin.middleware'
import { sessionAuth } from '../../../middlewares/session.middleware';

const routes = express.Router();

// CREATING AdminSubscription TAG
/**
 * @swagger
 * tags:
 *  name: AdminSubscription                                                                     
 *  description: Admin Subscription Routes
 */

/**
 * @swagger
 * /admin/subscription/new-subscription:
 *  post:
 *      summary: Adding new subscription
 *      tags: [AdminSubscription]
 *      description: Adding new subscription
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          subscriptionPlan:
 *                              type: string
 *                              required: true
 *                              example: "SILVER"
 *                          subscriptionMonths:
 *                              type: number
 *                              required: true
 *                          price:
 *                              type: number
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
routes.post('/new-subscription', sessionAuth, adminAuth, adminSubscriberController.newSubscription)

/**
 * @swagger
 * /admin/subscription/update-subscription/{subscriptionId}:
 *  patch:
 *      summary: Update existing subscription
 *      tags: [AdminSubscription]
 *      description: Updatingexisting subscription
 *      parameters:
 *        - in: path
 *          name: subscriptionId
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
 *                          subscriptionPlan:
 *                              type: string
 *                              required: false
 *                              example: "SILVER"
 *                          subscriptionMonths:
 *                              type: number
 *                              required: false
 *                          price:
 *                              type: number
 *                              required: false
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
routes.patch('/update-subscription/:subscriptionId', sessionAuth, adminAuth, adminSubscriberController.updateSubscription)

/**
 * @swagger
 * /admin/subscription/delete-subscription/{subscriptionId}:
 *  delete:
 *      summary: Delete existing subscription
 *      tags: [AdminSubscription]
 *      description: Delete existing subscription using subscriptionID
 *      parameters:
 *        - in: path
 *          name: subscriptionId
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
routes.delete('/delete-subscription/:subscriptionId', sessionAuth, adminAuth, adminSubscriberController.deleteSubscription)

export default routes;
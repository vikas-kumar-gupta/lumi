import express from 'express'
import { adminController } from '../../../controllers';
import {auth} from '../../../middlewares/admin.middleware'

const routes = express.Router();

routes.post('/signup', adminController.adminSignup)
routes.post('/login', adminController.adminLogin)
routes.get('/report/:reportId', auth, adminController.reportDetails)
routes.delete('/delete-user/:userId', auth, adminController.deleteUser)

// ! to be implemented
routes.post('/review-report/:reportId', auth, adminController.reviewReport)

// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: Admin                                                                     
 *  description: Admin Routes
 */


/**
 * @swagger
 * /admin/signup:
 *  post:
 *      summary: Admin Signup
 *      tags: [Admin]
 *      description: creating new admin account
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          isAdmin:
 *                              type: boolean
 *                              required: true
 *                          name:
 *                              type: string
 *                              required: true
 *                          email:
 *                              type: string
 *                              required: true
 *                          gender:
 *                              type: string
 *                              required: true
 *                          dob:
 *                              type: date
 *                              required: false
 *                          profilePicture:
 *                              type: [string]
 *                              required: true
 *                          phoneNumber:
 *                              type: string
 *                              required: true
 *                          password:
 *                              type: string
 *                              required: true
 *                          geometry:
 *                              type: object
 *                              required: false
 *                          homeTown:
 *                              type: string
 *                              required: true
 *                          jobTitle:
 *                              type: string
 *                              required: true
 *                          isPhoneVerified:
 *                              type: boolean
 *                              required: false
 *                          isMailVerified:
 *                              type: boolean
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

/**
 * @swagger
 * /admin/login:
 *  post:
 *      summary: Admin login
 *      tags: [Admin]
 *      description: admin login
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phoneNumber:
 *                              type: string
 *                              required: true
 *                          password:
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



/**
 * @swagger
 * /admin/report/{reportId}:
 *  get:
 *      summary: Report Details
 *      tags: [Admin]
 *      description: Submitted report details of a user
 *      parameters:
 *        - in: path
 *          name: reportId
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
 * /admin/delete-user/{userId}:
 *  get:
 *      summary: Delete User
 *      tags: [Admin]
 *      description: delete the account of reported user
 *      parameters:
 *        - in: path
 *          name: userId
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

import express from "express";
import { userController } from "../../controllers";
import {auth, isLoggedIn} from '../../middlewares/user.middleware'

const routes = express.Router();

routes.post('/signup/verify-otp', userController.verifyOtp);
routes.post('/signup/get-otp', userController.getOtp);
routes.post('/update', auth, userController.updateUser);

// CREATING TAGS
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Routes
 */

// USER SCHEMA
/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                  email:
 *                      type: email
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *                  gender:
 *                      type: string
 *                      required: true
 *                  dob:
 *                      type: date
 *                      required: true
 *                  phoneNumber: 
 *                      type: number
 *                      required: true
 *                  isVerified:
 *                      type: boolean
 *                      required: true
 *                  subscription:
 *                      type: object
 *                      required: false
 *                  bio:
 *                      type: array[string]
 *                      required: false
 *                      example: ["str1", "str2", "str3", "str4", "str5"]
 *                  geometry:
 *                      type: array[string]
 *                      required: true
 *                      example: ["latitude", "longitude"]
 *                  homeTown:
 *                      type: string
 *                      required: true
 *                  jobTitle:
 *                      type:  string
 *                      required: true
 *                  eduLevel: 
 *                      type: string
 *                      required: true
 *                  religiousBelief:
 *                      type: string
 *                      required: true
 *                  haveCigares:
 *                      type: string
 *                      required: true
 *                  haveAlcohol:
 *                      type: string
 *                      required: true
 *                  haveMarijuana:
 *                      type: string
 *                      required: true
 *                  haveDrugs:
 *                      type: string
 *                      required: true
 *                  piliticalLeaning:
 *                      type: string
 *                      required: true
 *                  ageBetween:
 *                      type: array[number]
 *                      required: true
 *                      example: [18, 26]
 *                  height:
 *                      type: array[number]
 *                      required: true
 *                      example: [18, 26]
 *                  interestedIn:
 *                      type: string
 *                      required: true
 *                  reportNum:
 *                      type: number
 *                      required: false
 *                  createdAt:
 *                      type: date
 *                      required: false
 *                  updatedAt:
 *                      type: date
 *                      required: false
 */


/**
 * @swagger
 * /user/signup/send-otp:
 *  post:
 *      summary: Phone Number Authenctication
 *      tags: [User]
 *      description: user login with phone number
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
 * /user/signup/verify-otp:
 *  post:
 *      summary: Phone Number Authenctication
 *      tags: [User]
 *      description: user login with phone number
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
 *                          otp:
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


export default routes
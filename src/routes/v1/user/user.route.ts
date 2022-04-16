import express from "express";
import { userController } from "../../../controllers";
import {auth, isLoggedIn} from '../../../middlewares/user.middleware'

const routes = express.Router();

routes.post('/signup/get-otp', userController.getOtp);
routes.post('/signup/verify-otp', userController.verifyOtp);
routes.get('/profile', auth, userController.userDetails)
routes.patch('/profile/update', auth, userController.updateUser);
routes.patch('/change-phoneNumber', auth, userController.changePhoneNumber);                //  done
routes.get('/my-bookings', auth, userController.myBookings);

/**
 * TODO:
 * Given below each route & controller is to be implemented
 */

routes.post('/verify-email', auth, userController.verifyEmail);

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
 * /user/signup/get-otp:
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
 *                          loginType:
 *                              type: string
 *                              required: true
 *                              example: "PHONENUMBER"
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
 * /user/profile:
 *  get:
 *      summary: User profile data
 *      tags: [User]
 *      description: user profile all data
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
 * /user/my-bookings:
 *  get:
 *      summary: User Bookings
 *      tags: [User]
 *      description: user booking all data
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
 * /user/profile/update:
 *  patch:
 *      summary: User data updation
 *      tags: [User]
 *      description: Update all the remaining crucial information of user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              required: false
 *                          email:
 *                              type: string
 *                              requied: false
 *                          gender:
 *                              type: string
 *                              required: false
 *                          dob:
 *                              type: date
 *                              required: false
 *                          phoneNumber:
 *                              type: string
 *                              required: false
 *                          profilePicture:
 *                              type: [string]
 *                              required: false
 *                          isPhoneVerified:
 *                              type: boolean
 *                              required: false
 *                          isMailVerified:
 *                              type: boolean
 *                              required: false
 *                          subscription:
 *                              type: object
 *                              required: false
 *                          bio:
 *                              type: [string]
 *                              required: false
 *                          geometry:
 *                              type: object
 *                              required: false
 *                          homeTown:
 *                              type: string
 *                              required: false
 *                          jobTitle:
 *                              type: string
 *                              required: false
 *                          eduLevel:
 *                              type: string
 *                              required: false
 *                          religiousBelief:
 *                              type: string
 *                              required: false
 *                          haveCigares:
 *                              type: string
 *                              required: false
 *                          haveAlcohol:
 *                              type: string
 *                              required: false
 *                          haveMarijuana:
 *                              type: string
 *                              required: false
 *                          haveDrugs:
 *                              type: string
 *                              required: false
 *                          politicalLeaning:
 *                              type: string
 *                              required: false
 *                          ageBetween:
 *                              type: [number]
 *                              required: false
 *                          height:
 *                              type: [number]
 *                              required: false
 *                          interestedIn:
 *                              type: string
 *                              required: false
 *                          zodiac:
 *                              type: string
 *                              required: false
 *                          reportNum:
 *                              type: number
 *                              required: false
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
 * /user/change-phoneNumber:
 *  patch:
 *      summary: User data updation
 *      tags: [User]
 *      description: Update all the remaining crucial information of user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          newPhoneNumber:
 *                              type: string
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
 * /user/verify-email:
 *  post:
 *      summary: Email Verification
 *      tags: [User]
 *      description: Verify the the given mail of the user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
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

export default routes
import express from "express";
import { userController } from "../../../controllers";
import { sessionAuth } from "../../../middlewares/session.middleware";
import { userAuth } from '../../../middlewares/user.middleware'

const routes = express.Router();

routes.post('/signup/get-otp', userController.getOtp);
routes.post('/signup/verify-otp', userController.verifyOtp);
routes.get('/profile', sessionAuth, userAuth, userController.userDetails)
routes.patch('/profile/update', sessionAuth, userAuth, userController.updateUser);
routes.patch('/change-phoneNumber', sessionAuth, userAuth, userController.changePhoneNumber);
routes.get('/my-bookings', sessionAuth, userAuth, userController.myBookings);
routes.post('/verify-email', sessionAuth, userAuth, userController.verifyEmail);
routes.get('/verify-email/:token', userController.verifyEmailWithToken);


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
 *                      required: false
 *                  email:
 *                      type: email
 *                      required: false
 *                  gender:
 *                      type: string
 *                      required: false
 *                  dob:
 *                      type: string
 *                      example: "01/01/2000"
 *                      required: false
 *                  phoneNumber: 
 *                      type: string
 *                      required: true
 *                  isPhoneVerified:
 *                      type: boolean
 *                      required: true
 *                  isMailVerified:
 *                      type: boolean
 *                      required: false
 *                  subscription:
 *                      type: object
 *                      required: false
 *                  bio:
 *                      type: [string]
 *                      example: ["str1", "str2", "str3", "str4", "str5"]
 *                      required: false
 *                  geometry:
 *                      type: object
 *                      required: false
 *                      properties:
 *                          type: 
 *                              type: string
 *                              require: true
 *                          coordinates:
 *                              type: [number, number]
 *                              require: true
 *                  homeTown:
 *                      type: string
 *                      required: false
 *                  jobTitle:
 *                      type:  string
 *                      required: false
 *                  eduLevel: 
 *                      type: string
 *                      required: false
 *                  religiousBelief:
 *                      type: string
 *                      required: false
 *                  haveCigares:
 *                      type: string
 *                      required: false
 *                  haveAlcohol:
 *                      type: string
 *                      required: false
 *                  haveMarijuana:
 *                      type: string
 *                      required: false
 *                  haveDrugs:
 *                      type: string
 *                      required: false
 *                  piliticalLeaning:
 *                      type: string
 *                      required: false
 *                  ageBetween:
 *                      type: [number]
 *                      required: false
 *                      example: [18, 26]
 *                  height:
 *                      type: [number]
 *                      required: false
 *                      example: [18, 26]
 *                  interestedIn:
 *                      type: string
 *                      required: false
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
 *                              example: "exampe@gmail.com"
 *                              requied: false
 *                          gender:
 *                              type: string
 *                              required: false
 *                          dob:
 *                              type: string
 *                              example: "01/01/2000"
 *                              required: false
 *                          phoneNumber:
 *                              type: string
 *                              example: "+919999999999"
 *                              required: false
 *                          profilePicture:
 *                              type: [string]
 *                              example: ["img-url-1", "img-url-2", "img-url-3", "img-url-4", "img-url-5"]
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
 *                              example: ["Bio-1", "Bio-2", "Bio-3", "Bio-4", "Bio-5"]
 *                              required: false
 *                          geometry:
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
 *                                  
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
 *                          haveCigarette:
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
 *                              example: [18, 26]
 *                              required: false
 *                          height:
 *                              type: [number]
 *                              example: [5, 2]
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
 *      summary: Update phone number
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
 *                              example: "+919999999999"
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
 *                              example: example@gmail.com
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
import express from "express";
import { userController } from "../../../controllers";
import { sessionAuth } from "../../../middlewares/session.middleware";
import { userAuth } from '../../../middlewares/user.middleware'

const routes = express.Router();

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
 *                  location:
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
routes.post('/signup/get-otp', userController.default.getOtp);

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
routes.post('/signup/verify-otp', userController.default.verifyOtp);

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
routes.get('/profile', sessionAuth, userAuth, userController.default.userDetails)

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
 *                              example: "Peter Parker"
 *                              required: false
 *                          email:
 *                              type: string
 *                              example: "exampe@gmail.com"
 *                              requied: false
 *                          gender:
 *                              type: string
 *                              example: "Male"
 *                              required: false
 *                          dob:
 *                              type: string
 *                              example: "01/01/2000"
 *                              required: false
 *                          profilePicture:
 *                              type: [string]
 *                              example: ["img-url-1", "img-url-2", "img-url-3", "img-url-4", "img-url-5", "img-url-6"]
 *                              required: false
 *                          bio:
 *                              type: [string]
 *                              example: ["Bio-1", "Bio-2", "Bio-3", "Bio-4"]
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
 *                                  
 *                          homeTown:
 *                              type: string
 *                              example: "B-25, Appinventiv Technology Pvt. Ltd"
 *                              required: false
 *                          jobTitle:
 *                              type: string
 *                              example: "Software Engineer"
 *                              required: false
 *                          eduLevel:
 *                              type: string
 *                              example: "Undergraduate"
 *                              required: false
 *                          religiousBelief:
 *                              type: string
 *                              example: "Hinduism"
 *                              required: false
 *                          haveCigarette:
 *                              type: string
 *                              example: "Sometimes"
 *                              required: false
 *                          haveAlcohol:
 *                              type: string
 *                              example: "Sometimes"
 *                              required: false
 *                          haveMarijuana:
 *                              type: string
 *                              example: "Sometimes"
 *                              required: false
 *                          haveDrugs:
 *                              type: string
 *                              required: false
 *                              example: "Sometimes"
 *                          politicalLeaning:
 *                              type: string
 *                              example: "Moderate"
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
 *                              example: "Women"
 *                              required: false
 *                          zodiac:
 *                              type: string
 *                              example: "Gemini"
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
routes.patch('/profile/update', sessionAuth, userAuth, userController.default.updateUser);

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
routes.patch('/change-phoneNumber', sessionAuth, userAuth, userController.default.changePhoneNumber);

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
routes.get('/my-bookings', sessionAuth, userAuth, userController.default.myBookings);

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
routes.post('/verify-email', sessionAuth, userAuth, userController.default.verifyEmail);
routes.get('/verify-email/:token', userController.default.verifyEmailWithToken);

/**
 * @swagger
 * /user/payment:
 *  post:
 *      summary: Payment
 *      tags: [User]
 *      description: Initiating a payment
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          price:
 *                              type: number
 *                              required: true
 *                          payTax:
 *                              type: number
 *                              required: true
 *                          payDescription:
 *                              type: string
 *                              required: fals
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
routes.post('/payment', sessionAuth, userAuth, userController.default.initPayment)

/**
 * @swagger
 * /user/subscribe-plan/{subscriptionId}:
 *  post:
 *      summary: Subscribe a subscription Plan
 *      tags: [User]
 *      description: Subscribe a subscription Plan
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
routes.post('subscribe-plan/:subscriptionId', sessionAuth, userAuth)

export default routes
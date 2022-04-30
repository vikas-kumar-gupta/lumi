import express from "express";
import { userAuth } from '../../../middlewares/user.middleware'
import { userMatchController } from "../../../controllers";
import { sessionAuth } from "../../../middlewares/session.middleware";

const routes = express.Router();

// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: UserMatch                                                                     
 *  description: Admin Routes
 */

/**
 * @swagger
 * /user/match/maybe-matches:
 *  get:
 *      summary: Matches list
 *      tags: [UserMatch]
 *      description: Matches list
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
routes.get('/maybe-matches', sessionAuth, userAuth, userMatchController.default.mayBeMatches)

/**
 * @swagger
 * /user/match/profile/{userId}:
 *  get:
 *      summary: Match Profile Details
 *      tags: [UserMatch]
 *      description: Match Profile Details
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
routes.get('/profile/:userId', sessionAuth, userAuth, userMatchController.default.matchProfileDetails)

/**
 * @swagger
 * /user/match/report/{userId}:
 *  post:
 *      summary: Report Profile
 *      tags: [UserMatch]
 *      description: Report a profile 
 *      parameters:
 *        - in: path
 *          name: userId
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
 *                          reasons:
 *                              type: string
 *                              required: false
 *                          otherReasons:
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
routes.post('/report/:userId', sessionAuth, userAuth, userMatchController.default.reportProfile)

/**
 * @swagger
 * /user/match/block/{userId}:
 *  get:
 *      summary: Block Profile
 *      tags: [UserMatch]
 *      description: Block UserProfile
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
routes.get('/block/:userId', sessionAuth, userAuth, userMatchController.default.blockProfile)

/**
 * TODO:
 * Given below each route & controller is to be implemented
 */

routes.get('/:userId/invite/:eventId', sessionAuth, userAuth, userMatchController.default.matchProfileInviteEvent)

export default routes;
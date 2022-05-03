import express from "express";
import { userAuth } from '../../../middlewares/user.middleware'
import { userInviteController } from "../../../controllers";
import { sessionAuth } from "../../../middlewares/session.middleware";

const routes = express.Router();

// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: UserInvite                                                              
 *  description: User Invite Related Routes
 */

/**
 * @swagger
 * /user/invite/sent:
 *  get:
 *      summary: Sent invite requests
 *      tags: [UserInvite]
 *      description: Sent invite requests
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
routes.get('/sent', sessionAuth, userAuth, userInviteController.default.invitesSent);

/**
 * @swagger
 * /user/invite/received:
 *  get:
 *      summary: Received invite requests
 *      tags: [UserInvite]
 *      description: Received invite requests
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
routes.get('/received', sessionAuth, userAuth, userInviteController.default.invitesReceived);

/**
 * @swagger
 * /user/invite/accept/{userInviteId}:
 *  post:
 *      summary: Accept received invite request
 *      tags: [UserInvite]
 *      description: Accept received invite request
 *      parameters:
 *        - in: path
 *          name: userInviteId
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
routes.post('/accept/:userInviteId', sessionAuth, userAuth, userInviteController.default.acceptInvitation);

/**
 * @swagger
 * /user/invite/decline/{userInviteId}:
 *  post:
 *      summary: Decline received invite request
 *      tags: [UserInvite]
 *      description: Decline received invite request
 *      parameters:
 *        - in: path
 *          name: userInviteId
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
routes.post('/decline/:userInviteId', sessionAuth, userAuth, userInviteController.default.declineInvitation)

/**
 * @swagger
 * /user/invite/buy-ticket/{userInviteId}:
 *  post:
 *      summary: Buy tiket for user invite
 *      tags: [UserInvite]
 *      description: Buy tiket for user invite after accepting the invitation request
 *      parameters:
 *        - in: path
 *          name: userInviteId
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
routes.post('/buy-ticket/:userInviteId', sessionAuth, userAuth, userInviteController.default.userInviteBuyTicket)

export default routes;
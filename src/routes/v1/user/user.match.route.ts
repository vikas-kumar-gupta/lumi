import express from "express";
import { userAuth } from '../../../middlewares/user.middleware'
import { userMatchController } from "../../../controllers";

const routes = express.Router();

/**
 * TODO:
 * Given below each route & controller is to be implemented
 */

routes.get('/', userAuth, userMatchController.matches)
routes.get('/maybe-matches', userAuth, userMatchController.mayBeMatches)
routes.get('/profile/:userId', userAuth, userMatchController.matchProfile)
routes.post('/report/:userId', userAuth, userMatchController.matchProfileReport)
routes.get('/block/:userId', userAuth, userMatchController.matchProfileBlock)
routes.get('/:userId/invite/:eventId', userAuth, userMatchController.matchProfileInviteEvent)

export default routes;
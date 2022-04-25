import express from "express";
import { userAuth } from '../../../middlewares/user.middleware'
import { userMatchController } from "../../../controllers";
import { sessionAuth } from "../../../middlewares/session.middleware";

const routes = express.Router();

/**
 * TODO:
 * Given below each route & controller is to be implemented
 */

routes.get('/', sessionAuth, userAuth, userMatchController.matches)
routes.get('/maybe-matches', sessionAuth, userAuth, userMatchController.mayBeMatches)
routes.get('/profile/:userId', sessionAuth, userAuth, userMatchController.matchProfile)
routes.post('/report/:userId', sessionAuth, userAuth, userMatchController.matchProfileReport)
routes.get('/block/:userId', sessionAuth, userAuth, userMatchController.matchProfileBlock)
routes.get('/:userId/invite/:eventId', sessionAuth, userAuth, userMatchController.matchProfileInviteEvent)

export default routes;
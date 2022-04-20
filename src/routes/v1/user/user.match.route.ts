import express from "express";
import { auth } from '../../../middlewares/user.middleware'
import { userMatchController } from "../../../controllers";

const routes = express.Router();

/**
 * TODO:
 * Given below each route & controller is to be implemented
 */

routes.get('/', auth, userMatchController.matches)
routes.get('/maybe-matches', auth, userMatchController.mayBeMatches)
routes.get('/profile/:userId', auth, userMatchController.matchProfile)
routes.post('/report/:userId', auth, userMatchController.matchProfileReport)
routes.get('/block/:userId', auth, userMatchController.matchProfileBlock)
routes.get('/:userId/invite/:eventId', auth, userMatchController.matchProfileInviteEvent)

export default routes;
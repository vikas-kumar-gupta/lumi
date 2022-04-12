import express from "express";
import {auth, isLoggedIn} from '../../middlewares/user.middleware'
import { matchController } from "../../controllers";

const routes = express.Router();

/**
 * TODO:
 * Given below each route & controller is to be implemented
 */

routes.get('/', auth, matchController.matches)
routes.get('/maybe-matches', auth, matchController.mayBeMatches)
routes.get('/profile/:userId', auth, matchController.matchProfile)
routes.post('/report/:userId', auth, matchController.matchProfileReport)
routes.get('/block/:userId', auth, matchController.matchProfileBlock)
routes.get('/:userId/invite/:eventId', auth, matchController.matchProfileInviteEvent)

export default routes;
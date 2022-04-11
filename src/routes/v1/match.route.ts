import express from "express";
import {auth, isLoggedIn} from '../../middlewares/user.middleware'
import { matchController } from "../../controllers";

const routes = express.Router();

routes.get('/', auth, matchController.matches)
routes.get('/maybe-matches', auth, matchController.mayBeMatches)
routes.get('/:userId/profile', auth, matchController.matchProfile)
routes.post('/:userId/report', auth, matchController.matchProfileReport)
routes.get('/:userId/block', auth, matchController.matchProfileBlock)
routes.get('/:userId/:eventId/invite', auth, matchController.matchProfileInviteEvent)

export default routes;
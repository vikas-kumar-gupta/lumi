import express from "express";
import { userAuth } from '../../../middlewares/user.middleware'
import { userInviteController } from "../../../controllers";
import { sessionAuth } from "../../../middlewares/session.middleware";

const routes = express.Router();

routes.get('/sent', sessionAuth, userAuth, userInviteController.default.invitesSent);
routes.get('/received', sessionAuth, userAuth, userInviteController.default.invitesReceived);
routes.post('/accept/:inviteId', sessionAuth, userAuth, userInviteController.default.acceptInvitation);
routes.post('/decline/:inviteId', sessionAuth, userAuth, userInviteController.default.declineInvitation)

export default routes;
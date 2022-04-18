import express from 'express'
import { adminSubscriberController } from '../../../controllers/index'

const routes = express.Router();

routes.post('/new-subscription', adminSubscriberController.newSubscription)
routes.patch('/update-subscription/:subscriptionId', adminSubscriberController.updateSubscription)
routes.delete('/delete-subscription/:subscriptionId', adminSubscriberController.deleteSubscription)

export default routes;
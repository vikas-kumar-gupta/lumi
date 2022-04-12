import express from 'express'
import { adminSubscriberController } from '../../../controllers/index'

const routes = express.Router();

routes.post('/new-subscription', adminSubscriberController.newSubscription)
routes.patch('update-subscription', adminSubscriberController.updateSubscription)
routes.delete('delete-subscription', adminSubscriberController.deleteSubscription)

export default routes;
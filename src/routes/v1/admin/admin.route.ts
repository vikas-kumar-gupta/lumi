import express from 'express'
import { adminController } from '../../../controllers';

const routes = express.Router();

routes.post('/review-report', adminController.reviewReport)
routes.delete('/delete-user', adminController.deleteUser)

export default routes;

import express from 'express'
import { adminController } from '../../../controllers';

const routes = express.Router();

routes.get('/report/:reportId', adminController.reportDetails)
routes.post('/review-report/:reportId', adminController.reviewReport)
routes.delete('/delete-user/:userId', adminController.deleteUser)

export default routes;

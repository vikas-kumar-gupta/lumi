import express from 'express'
import { adminController } from '../../../controllers';

const routes = express.Router();

// ! Error mongoose.Types.ObjectId at :reportId
routes.get('/report/:reportId', adminController.reportDetails)

// ! to be implemented
routes.post('/review-report/:reportId', adminController.reviewReport)
routes.delete('/delete-user/:userId', adminController.deleteUser)

// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: Admin                                                                     
 *  description: User Routes
 */

/**
 * @swagger
 * /admin/report/{reportId}:
 *  get:
 *      summary: Report Details
 *      tags: [Admin]
 *      description: Submitted report details of a user
 *      parameters:
 *        - in: path
 *          name: reportId
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          200:
 *              description: Sucess
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */



export default routes;

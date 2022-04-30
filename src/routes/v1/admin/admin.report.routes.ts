import express from 'express';
import AdminReportController from '../../../controllers/v1/admin/admin.report.controller';
import { adminAuth } from '../../../middlewares/admin.middleware';
import { sessionAuth } from '../../../middlewares/session.middleware';

const routes = express.Router();

// CREATING UserEvent TAG
/**
 * @swagger
 * tags:
 *  name: AdminReport                                                                    
 *  description: Admin Routes
 */

/**
 * @swagger
 * /admin/report/all-reports:
 *  get:
 *      summary: All reports
 *      tags: [AdminReport]
 *      description: All reports
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
routes.get('/all-reports', sessionAuth, adminAuth, AdminReportController.allReports)

/**
 * @swagger
 * /admin/report/{reportId}:
 *  get:
 *      summary: Report Details
 *      tags: [AdminReport]
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
routes.get('/:reportId', sessionAuth, adminAuth, AdminReportController.reportDetails)

/**
 * @swagger
 * /admin/report/{reportId}:
 *  post:
 *      summary: Report action
 *      tags: [AdminReport]
 *      description: Review a report by either approving or disaprooving it
 *      parameters:
 *        - in: path
 *          name: reportId
 *          schema:
 *              type: string
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          isApproved:
 *                              type: boolean
 *                              required: true
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
routes.post('/:reportId', sessionAuth, adminAuth, AdminReportController.reviewReport)

export default routes;
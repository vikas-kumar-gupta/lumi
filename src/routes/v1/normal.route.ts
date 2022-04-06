import { STATUS_MSG } from '../../constants'
import express, { Request, Response } from 'express';

const router = express.Router();


// CREATING TAGS

/**
 * @swagger
 * tags:
 *  name: Default
 *  description: Default Routes
 */

/**
 * @swagger
 * /:
 *  get:
 *      tags: [Default]
 *      summary: Landing Page
 *      description: landing page of the project
 *      responses:
 *          200:
 *              description: Sucess
 *          500:
 *              description: Internal server error
 */
router.get('/', (req: Request, res: Response) => {
    res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(STATUS_MSG.SUCCESS.DEFAULT);
})

/**
 * @swagger
 * /*:
 *  get:
 *      tags: [Default]
 *      summary: Page Not Found
 *      description: all the undefined paths will be routed here to show PAGE_NOT_FOUND
 *      responses:
 *          400:
 *              description: Not found
 *          500:
 *              description: Internal server error
 */
router.get('/*', (req: Request, res: Response) => {
    res.status(STATUS_MSG.ERROR.PAGE_NOT_FOUND.statusCode).json(STATUS_MSG.ERROR.PAGE_NOT_FOUND);
})

export default router;
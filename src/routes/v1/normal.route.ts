import { STATUS_MSG } from '../../constants'
import express, { Request, Response } from 'express';

import { upload } from '../../middlewares/multer.middleware'
import { normalController } from '../../controllers'

const router = express.Router();

router.get('/', normalController.homePage)
router.post('/form-data',upload.single("img"), normalController.getFormData)
router.get('/*', normalController.pageNotFound)

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

export default router;
import express from 'express';
import { upload } from '../../middlewares/multer.middleware'
import { normalController } from '../../controllers'

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
router.get('/', normalController.landingPage)

// ! for testig purpose
router.post('/form-data', upload.single('imgUrl') ,normalController.getFormData)
router.post('/logout')

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
router.get('/*', normalController.pageNotFound)

export default router;
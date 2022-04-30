import { STATUS_MSG, CONFIG } from '../../constants'
import { Request, Response, NextFunction } from 'express'
import { sendErrorResponse } from '../../utils/utils'
export default class DefaultController {
    static async landingPage(req: Request, res: Response, next: NextFunction) {
        res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(STATUS_MSG.SUCCESS.DEFAULT);
    }

    static async pageNotFound(req: Request, res: Response, next: NextFunction) {
        res.status(STATUS_MSG.ERROR.PAGE_NOT_FOUND.statusCode).json(STATUS_MSG.ERROR.PAGE_NOT_FOUND);
    }

    // ! function for testing purpose
    static async getFormData(req: Request, res: Response, next: NextFunction) {
        try {

            let imgUrl = `http://${CONFIG.HOST}:${CONFIG.PORT}/build/uploads/public/${req.file?.filename}`;
            let bodyData = req.body;
            bodyData.imgUrl = imgUrl;
            res.status(200).json({ ...bodyData });
        }
        catch (err: any) {
            console.log(err);
            console.log(err.name);

            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData);
        }
    }
}
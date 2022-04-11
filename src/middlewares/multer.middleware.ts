import express, {Request, Response, NextFunction} from 'express'
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: `${__dirname}/../uploads/public`,
    filename: (req:Request, file:any, cb:any) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

export const upload = multer({
    storage: storage,
})
import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: `${__dirname}/../uploads/public`,
    filename: (req: Request, file: any, cb: any) => {
        const ext = path.extname(file.originalname);
        if (ext == ".png" || ext == ".jpg" || ext == ".jpeg") {
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
        else {
            return cb(new Error("Only images file are allowed"))
        }
    }
})

export const upload = multer({
    storage: storage,
})

export default upload;

const multer = require('multer');
const { v4: uuid } = require('uuid');
const uploadDirectory = 'upload';
import { StorageEngine } from 'multer';
import { Request } from 'express';
import { DiskStorageCallback } from "../interfaces";

const storage: StorageEngine = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: DiskStorageCallback) {
        cb(null, uploadDirectory);
    },
    filename(req: Request, file: Express.Multer.File, cb: DiskStorageCallback) {
        cb(null, `${uuid()}-${file.originalname}`);
    }
});

module.exports = multer({ storage });

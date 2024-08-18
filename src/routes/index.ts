const express = require('express');
const router = express.Router();
import { Response } from 'express';
import { IExtendedRequest } from "../interfaces";

router.get('/', (req: IExtendedRequest, res: Response) => {
    res.render('index', { currentRoute: '/', user: req.user });
})

module.exports = router;

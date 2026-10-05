import express, { Request, Response } from 'express';
import { commonService } from '../services/commonService.js';
import { Parameter } from '../schemas/extraTypes/Parameter.js';
export const router = express.Router();

router.get('/groups', async (req: Request, res: Response) => {
    res.json(await commonService.getGroups(Parameter('DESCRIPTION', '')));
});
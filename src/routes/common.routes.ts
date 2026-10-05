import express, { Request, Response } from 'express';
import { commonService } from '../services/common.service.js';
import { Parameter } from '../schemas/extraTypes/parameter.schema.js';
export const router = express.Router();

router.get('/groups', async (req: Request, res: Response) => {
    res.json(await commonService.getGroups(Parameter('DESCRIPTION', '')));
});
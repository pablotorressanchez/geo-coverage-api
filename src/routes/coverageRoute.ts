import express, { Request, Response } from 'express';
import { commonService } from '../services/commonService.js';
import { Parameter } from '../schemas/extraTypes/Parameter.js';
import { SelectValueModel } from '../schemas/common/SelectValueModel.js';
import { coverageService } from '../services/coverageService.js';
export const router = express.Router();

router.post('/branches/company', async (req: Request, res: Response) => {
    const param = Parameter('COMPANY_ID', req.body.resourceId);

    res.json(await commonService.getSlsBranches(param, req.body?.type));
});

router.post('/branch', async (req: Request, res: Response) => {
    const param = Parameter('RESOURCE', req.body.resourceId);

    res.json(await commonService.getSlsCoverages(param, req.body?.type));
});

router.post('/polygon/branch', async (req: Request, res: Response) => {
    const param: SelectValueModel = req.body;

    res.json(await coverageService.getFeatureCollectionByBranchs(param));
});

router.post('/polygon/feature', async (req: Request, res: Response) => {
    const param: SelectValueModel = req.body;

    res.json(await coverageService.getFeatureCollectionByCoverages(param));
});
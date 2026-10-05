import express, { Request, Response } from 'express';
import { Parameter } from '../schemas/extraTypes/parameter.schema.js';
import { companyService } from '../services/company.service.js';
export const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const param = Parameter('DESCRIPTION', req.body.resourceId);
    res.json(await companyService.getCompanyById(param));
});

router.get('/:companyId', async (req: Request, res: Response) => {
    const param = Parameter('DESCRIPTION', req.params.companyId);
    res.json(await companyService.getCompanyById(param));
});

router.get('/group/:groupId', async (req: Request, res: Response) => {
    const param = Parameter('DESCRIPTION', req.params.groupId);
    res.json(await companyService.getCompaniesByGroup(param));
});

router.post('/branches', async (req: Request, res: Response) => {
    
    const param = Parameter('DESCRIPTION', req.body.resourceId);
    res.json(await companyService.getCompaniesByGroup(param));
});
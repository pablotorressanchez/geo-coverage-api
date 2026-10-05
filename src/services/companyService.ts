import { companyRepository } from "../db/companyRepository.js";
import { Parameter, ParameterModel } from "../schemas/extraTypes/Parameter.js";

export const companyService = {
    getCompanies: async (param: ParameterModel) => {
        return await companyRepository.getCompanies(Parameter('DESCRIPTION', ''));
    },

    getCompanyById: async (param: ParameterModel) => {
        return await companyRepository.getCompanyById(param);
    },
    
    getCompaniesByGroup: async (param: ParameterModel) => {
        return await companyRepository.getCompaniesByGroup(param);
    },
}
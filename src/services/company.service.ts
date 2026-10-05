import { companyRepository } from "../repository/company.repository.js";
import { Parameter, ParameterModel } from "../schemas/extraTypes/parameter.schema.js";

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
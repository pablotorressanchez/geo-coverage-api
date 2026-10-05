import { Company } from "../schemas/company.schema.js";
import { ParameterModel } from "../schemas/extraTypes/parameter.schema.js";
import { query } from "./query.js";

export const companyRepository = {
    getCompanies: async (param: ParameterModel) => {
        return await query.getQueryAsync<Company>('USP_COMPANY_SEL', param);
    },

    getCompanyById: async (param: ParameterModel) => {
        return await query.getQueryFirstAsync<Company>('UPS_COMPANY_SEL_BYID', param);
    },
    
    getCompaniesByGroup: async (param: ParameterModel) => {
        return await query.getQueryAsync<Company>('USP_COMPANY_SEL_BY_GROUP', param);
    },
}
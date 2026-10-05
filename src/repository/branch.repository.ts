import { ParameterModel } from "../schemas/extraTypes/parameter.schema.js";
import { Sucursal } from "../schemas/sucursal.schema.js";
import { query } from "./query.js";

export const branchRepository = {
    getBranchById: async (param: ParameterModel) => {
        return await query.getQueryFirstAsync<Sucursal>('USP_SUCURSAL_SEL_BYID', param);
    },
    
    getBranchByCompany: async (param: ParameterModel) => {
        return await query.getQueryAsync<Sucursal>('USP_SUCURSAL_SEL_BY_COMPANY', param);
    }
}
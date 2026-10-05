import { ParameterModel } from "../schemas/extraTypes/Parameter.js";
import { Sucursal } from "../schemas/Sucursal.js";
import { query } from "./query.js";

export const branchRepository = {
    getBranchById: async (param: ParameterModel) => {
        return await query.getQueryFirstAsync<Sucursal>('USP_SUCURSAL_SEL_BYID', param);
    },
    
    getBranchByCompany: async (param: ParameterModel) => {
        return await query.getQueryAsync<Sucursal>('USP_SUCURSAL_SEL_BY_COMPANY', param);
    }
}
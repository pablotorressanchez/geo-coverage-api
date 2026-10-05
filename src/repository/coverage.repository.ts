import { ParameterModel } from "../schemas/extraTypes/parameter.schema.js";
import { Polygon } from "../schemas/polygon.schema.js";
import { query } from "./query.js";

export const coverageRepository = {
    getPolygonById: async (param: ParameterModel) => {
        return await query.getQueryFirstAsync<Polygon>('USP_POLYGON_SEL_BYID', param);
    },
    
    getPolygonsByBranch: async (param: ParameterModel) => {
        return await query.getQueryAsync<Polygon>('USP_POLYGON_SEL_BY_SUCURSAL', param);
    }
}
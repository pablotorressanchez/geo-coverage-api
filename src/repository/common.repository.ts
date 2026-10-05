import { SelectValueModel } from "../schemas/common/SelectValueModel.js";
import { ParameterModel } from "../schemas/extraTypes/parameter.schema.js";
import { query } from "./query.js";

export const commonRepository = {
    getGroups: async (param: ParameterModel) => {
        const _query = 'SELECT group_id AS value, description AS displayText FROM tb_group WHERE status = 1 ORDER BY description';
        const data = await query.runQueryAsync<SelectValueModel>(_query);
        return data;
    }
}
import { commonRepository } from "../db/commonRepository.js";
import { ItemCollectionModel } from "../schemas/common/ItemCollectionModel.js";
import { SelectValueModel } from "../schemas/common/SelectValueModel.js";
import { ParameterModel } from "../schemas/extraTypes/Parameter.js";
import { branchService } from "./branchService.js";
import { coverageService } from "./coverageService.js";

export const commonService = {
    getGroups: async (param: ParameterModel) => {
        return await commonRepository.getGroups(param);
    },

    getSlsBranches: async (param: ParameterModel, type?: 'select' | 'data') => {
        return await branchService.getSlsBranches(param, type);
    },
    
    getSlsCoverages: async (param: ParameterModel, type?: 'select' | 'data') => {
        const { items, ...rest } = await coverageService.getPolygonsByBranch(param);
        
        let collection: ItemCollectionModel<SelectValueModel> = {
            ...rest,
            items: []
        };
        
        let slsCoverages: SelectValueModel[] = [];

        if (items?.length)
            slsCoverages = items.map(br => ({
                value: br.uniqueId,
                displayText: br.name
            } as SelectValueModel));

        if(slsCoverages.length)
            slsCoverages.unshift({
                value: param.Value?.toString() || '',
                displayText: 'Todos'
            });

        if(type === 'select')
            collection.items = slsCoverages;

        return collection;
    },
}
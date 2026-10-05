import { branchRepository } from "../repository/branch.repository.js";
import { ItemCollectionModel } from "../schemas/common/ItemCollectionModel.js";
import { SelectValueModel } from "../schemas/common/SelectValueModel.js";
import { ParameterModel } from "../schemas/extraTypes/parameter.schema.js";
import { Sucursal } from "../schemas/sucursal.schema.js";

export const branchService = {
    getBranchById: async (param: ParameterModel) => {
        return await branchRepository.getBranchById(param);
    },

    getBranchByCompany: async (param: ParameterModel) => {
        return await branchRepository.getBranchByCompany(param);
    },

    getSlsBranches: async (param: ParameterModel, type?: 'select' | 'data') => {
        const { items, ...rest } = await branchService.getBranchByCompany(param);
        
        let collection: ItemCollectionModel<SelectValueModel | Sucursal> = {
            ...rest,
            items
        };

        let slsBranchs: SelectValueModel[] = [];

        if (items?.length) {
            slsBranchs = items.map(br => ({
                value: br.uniqueId,
                displayText: br.sucursalCode
            } as SelectValueModel));
        }

        if(slsBranchs.length)
            slsBranchs.unshift({
                value: param.Value?.toString() || '',
                displayText: 'Todos'
            });

        if(type === 'select')
            collection.items = slsBranchs;

        return collection;
    },
    
}
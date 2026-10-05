import { coverageRepository } from "../repository/coverage.repository.js";
import { ItemCollectionModel } from "../schemas/common/ItemCollectionModel.js";
import { SelectValueModel } from "../schemas/common/SelectValueModel.js";
import { Parameter, ParameterModel } from "../schemas/extraTypes/parameter.schema.js";
import { FeatureModel, GeomType, polygonStyle } from "../schemas/geojson/types.js";
import { Polygon } from "../schemas/polygon.schema.js";
import { Sucursal } from "../schemas/sucursal.schema.js";
import { branchService } from "./branch.service.js";
import { wktToGeoJSON } from '@terraformer/wkt';

export const coverageService = {
    getPolygonById: async (param: ParameterModel) => {
        return await coverageRepository.getPolygonById(param);
    },
    
    getPolygonsByBranch: async (param: ParameterModel) => {
        return await coverageRepository.getPolygonsByBranch(param);
    },

    getFeatureCollectionByBranchs: async (param: SelectValueModel) => {
        const { displayText } = param;

        if (displayText === 'Todos')
            return await coverageService.getFeatureCollectionByCompany(param);
        else
            return await coverageService.getFeatureCollectionByBranch(param);
            
    },

    getFeatureCollectionByCompany: async (param: SelectValueModel) => {
        let featureCollection: FeatureModel[] = [];

        const { items: branchs, ...rest } = await branchService.getBranchByCompany(Parameter('COMPANY_ID', param.value));
        
        let collection: ItemCollectionModel<FeatureModel> = {
            ...rest,
            items: []
        };

        for (const branch of branchs) {
            const param: SelectValueModel = {
                value: branch.uniqueId,
                displayText: branch.description
            };

            const { items: features } = await coverageService.getFeatureCollectionByBranch(param, branch);

            featureCollection = [...featureCollection, ...features];
        }

        collection.items = featureCollection;

        return collection;

    },

    getFeatureCollectionByBranch: async ({ value }: SelectValueModel, sucursal?: Sucursal) => {
        const { items: polygons, ...rest } = await coverageService.getPolygonsByBranch(Parameter('RESOURCE', value));

        let collection: ItemCollectionModel<FeatureModel> = {
            ...rest,
            items: []
        };

        collection.items = await coverageService.getFeatureCollectionPolygon(polygons);

        if (sucursal) {
            collection.items.push(coverageService.getFeaturePoint(sucursal));
        } else {
            const { item: branch } = await branchService.getBranchById(Parameter('DESCRIPTION', value));
            if (branch)
                collection.items.push(coverageService.getFeaturePoint(branch));
        }

        return collection;

    },
    
    getFeatureCollectionByCoverage: async ({ value }: SelectValueModel) => {
        const { item: polygon, ...rest } = await coverageService.getPolygonById(Parameter('RESOURCE', value));

        let collection: ItemCollectionModel<FeatureModel> = {
            ...rest,
            items: []
        };

        if (polygon) {
            collection.items = [coverageService.getFeature(polygon)];
            return collection;
        }
        
        return collection;
    },

    getFeatureCollectionByCoverages: async (param: SelectValueModel) => {
        const { displayText } = param;

        if (displayText === 'Todos')
            return await coverageService.getFeatureCollectionByBranch(param);
        else
            return await coverageService.getFeatureCollectionByCoverage(param);


    },

    getFeatureCollectionPolygon: async (polygons: Array<Polygon>) => {
        let featureCollection: FeatureModel[] = [];
        
        for (const pol of polygons) 
            featureCollection.push(coverageService.getFeature(pol));
        
        return featureCollection;
    },

    getFeature: ({ uniqueId, name, description, geom }: Polygon) => {
        const feature: FeatureModel = {
            type: "Feature",
            id: uniqueId,
            properties: {
                id: uniqueId,
                name: name,
                popupContent: description,
                isBeginEdited: false
            },
            geometry: (typeof geom === "string") ? wktToGeoJSON(geom) as GeomType: new Object(),
            style: polygonStyle()
        }
        return feature;
    },

    getFeaturePoint: ({ uniqueId, sucursalCode, latitude, longitude, description }: Sucursal) => {
        const feature: FeatureModel = {
            type: "Feature",
            id: uniqueId,
            properties: {
                id: uniqueId,
                name: sucursalCode,
                popupContent: description,
                latLng: [latitude, longitude],
            },
            geometry: longitude && latitude ? wktToGeoJSON(`POINT(${longitude} ${latitude})`) as GeomType: new Object(),
        }
        return feature;
    }
}
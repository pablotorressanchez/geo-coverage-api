import { BaseModel } from "./common/BaseModel.js";

export interface Polygon extends BaseModel {
    sucursalId: string;
    sucursalCode: string;
    description: string;
    name: string;
    polygonDesc: string;
    type: string;
    geom: string;
}
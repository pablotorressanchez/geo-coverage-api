import { BaseModel } from "./common/BaseModel.js";
import { Coordinates } from "./extraTypes/Coordinates.js";

export interface Sucursal extends BaseModel, Coordinates {
    companyId: string;
    sucursalCode: string;
    description: string;
    direccion: string;
}
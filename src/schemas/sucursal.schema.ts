import { BaseModel } from "./common/BaseModel.js";
import { Coordinates } from "./extraTypes/coordinates.schema.js";

export interface Sucursal extends BaseModel, Coordinates {
    companyId: string;
    sucursalCode: string;
    description: string;
    direccion: string;
}
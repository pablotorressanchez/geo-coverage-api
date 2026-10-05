import { BaseModel } from "./common/BaseModel.js";

export interface Group extends BaseModel {
    groupCode: string;
    description: string;
}
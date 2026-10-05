import { BaseModel } from "./common/BaseModel.js";

export interface Company extends BaseModel {
    groupId: string;
    groupName: string;
    ruc: string;
    companyName: string;
    companyCode: string;
}
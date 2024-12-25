import { CompanyRepresentation } from "./compnay-representation";
import { WarehouseRepresentation } from "./warehouse-representation";

export interface ComWarehouseRepresntation {
    id?:string,
    companyName?:CompanyRepresentation,
    warehouseName?:WarehouseRepresentation,
}
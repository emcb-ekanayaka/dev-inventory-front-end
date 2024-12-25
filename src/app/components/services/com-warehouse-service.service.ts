import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComWarehouseServiceService {


  private baseUrl: string = 'http://localhost:8003/api/v1/companyhaswarehouse';
  private companyBaseUrl: string = 'http://localhost:8003/api/v1/company';

  constructor(
    private http: HttpClient
  ) { }

  createComWarehouse(comWareObj: any, type: any): Observable<any> {
    console.log(comWareObj);
    
    if (type == 'Add') {
      return this.http.post(this.baseUrl, comWareObj);
    } else {
      return this.http.put(this.baseUrl + "/" + comWareObj.id, comWareObj);
    }
  }

  GetAllComWarehoues():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetComWareByComAndWarehouse(companyId: any, warehouseId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/" + companyId + "/" + warehouseId);
  }

  GetComWarehouseById(ID: any): Observable<any> {
    return this.http.get(this.baseUrl + "/" + ID);
  }

  GetWarehouseForComWarehouse(ID: any): Observable<any> {
    return this.http.get(this.companyBaseUrl + "/getClass/" + ID);
  }

  DeleteComWarehouseById(ID: any): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + ID)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComWarehouseServiceService {


  private baseUrl: string = 'http://localhost:8003/api/v1/companyhaswarehouse';

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

  GetComWarehouesById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteComWarehouseById(ID: any): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + ID)
  }
}

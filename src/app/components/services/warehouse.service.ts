import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private baseUrl : string= 'http://localhost:8003/api/v1/warehouse'; 

  constructor(
    private http:HttpClient
  ) { }

  createWarehouse(student:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,student);
      }else{
        return this.http.put(this.baseUrl+"/"+student.id,student);
    }
        
  }

  GetAllWarehouses():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetWarehouseById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteWarehouseById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }
}

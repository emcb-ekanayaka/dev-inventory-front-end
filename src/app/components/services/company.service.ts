import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  private baseUrl : string= 'http://localhost:8003/api/v1/company'; 

  constructor(
    private http:HttpClient
  ) { }

  createCompany(student:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,student);
      }else{
        return this.http.put(this.baseUrl+"/"+student.id,student);
    }
        
  }

  GetAllCompanies():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetCompanyById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteCompanyById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }
}

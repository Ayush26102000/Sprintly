import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tenant } from "../Interfaces/tenant";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'https://your-api-url/api/tenant';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(this.baseUrl);
  }

  getById(id: string): Observable<Tenant> {
    return this.http.get<Tenant>(`${this.baseUrl}/${id}`);
  }

  create(tenant: { name: string; domain: string }): Observable<any> {
    return this.http.post(this.baseUrl, tenant);
  }

  update(id: string, tenant: { name: string; domain: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, tenant);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

 

}



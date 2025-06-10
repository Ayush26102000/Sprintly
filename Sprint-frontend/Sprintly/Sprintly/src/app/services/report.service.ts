import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <-- Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getUserReport(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5001/api/project/${userId}/GetUserReport`);
  }
}

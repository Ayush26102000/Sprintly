import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Sprint {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  projectId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private apiUrl = 'https://your-api-url/api/sprint';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.apiUrl);
  }

  getById(id: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.apiUrl}/${id}`);
  }

  create(sprint: Sprint): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, sprint);
  }

  update(id: string, sprint: Sprint): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, sprint);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

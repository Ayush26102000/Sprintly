import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { TaskItem, CreateTaskDto, UpdateTaskDto } from '../models/task.model';

interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tenantId: string;
}
interface CreateTaskDto {
  title: string;
  description: string;
  priority: number;       // Assuming the enum maps to number
  projectId: string;      // Required
  sprintId?: string;      // Optional
}



@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:5001/api/task'; 

  constructor(private http: HttpClient) {}

  createTask(dto: CreateTaskDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, dto);
  }

  getTasks(page = 1, pageSize = 10): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/list?page=${page}&pageSize=${pageSize}`);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, dto: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, dto);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

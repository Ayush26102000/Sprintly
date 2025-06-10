import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  projectId: string;
    assignedUserId: string;
  sprintId?: string | null;
    status: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  tenantName: string;
}

export enum TaskStatus {
  ToDo = 0,
  InProgress = 1,
  Done = 2
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5001/api/task';
  private apiPUrl = 'http://localhost:5001/api/Project';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/list`);
  }

 getAllProjects(): Observable<Project[]> {
  return this.http.get<Project[]>(`${this.apiPUrl}`);
}

  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, task);
  }

    getTasksByProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiPUrl}/project/${projectId}`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(`${this.apiPUrl}/${taskId}/status`, newStatus);
  }

  updateTask(id: string, task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  filterAndSortTasks(params: {
    status?: string;
    priority?: string;
    sortBy?: string;
    descending?: boolean;
  }): Observable<Task[]> {
    const queryParams = new HttpParams({ fromObject: params as any });
    return this.http.get<Task[]>(`${this.apiUrl}/filter-sort`, { params: queryParams });
  }
}

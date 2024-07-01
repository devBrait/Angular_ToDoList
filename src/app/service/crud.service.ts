import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks"
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  addTask(task: Task): Observable<Task> {
    task.id = this.generateId();
    return this.http.post<Task>(this.serviceURL, task);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task);
  }

  deleteTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.serviceURL+'/'+task.id);
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100);
  }
}

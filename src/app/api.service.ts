import { ITask } from './model/task';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  getTodo():any{
  let url='https://todoserver-production-6d87.up.railway.app/api/todo/';
  return this.http.get<ITask>(url);
}

  postTodo(body:any){
    let url='https://todoserver-production-6d87.up.railway.app/api/todo/';
    return this.http.post<ITask>(url,body,{responseType:'json'});
  }

  deleteTask(id:any){
    let url='https://todoserver-production-6d87.up.railway.app/api/todo/'+id;
    return this.http.delete<ITask>(url);
  }
  updateTask(id:any,body:any){
    let url='https://todoserver-production-6d87.up.railway.app/api/todo/'+id;
    return this.http.patch<ITask>(url,body,{responseType:'json'});
  }
}

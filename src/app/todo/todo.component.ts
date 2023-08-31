import { ITask } from './../model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup , Validators} from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !:FormGroup;
  tasks :ITask[]=[];
  inprogress :ITask[]=[];
  done:ITask[]=[];
  updateId!: any;
  isEditEnabled :boolean=false;

  constructor(private fb:FormBuilder,private api:ApiService){
    this.api.getTodo().subscribe((data:ITask[])=>{
      this.done = data.filter(x => x.status === 'done')
      this.inprogress = data.filter(x => x.status === 'working')
      this.tasks = data.filter(x => x.status === 'todo')
    })
  }

  ngOnInit(): void {
  this.todoForm=this.fb.group({
    title :['',Validators.required],
    body :['',Validators.required],
  })
  // console.log(this.tasks,this.inprogress,this.done)

  }

  addTask(){
      this.tasks.push({
      title: this.todoForm.value.title,
      body: this.todoForm.value.body
    })
    let body=this.todoForm.value;
    // console.log(body);
    this.api.postTodo(body).subscribe((data:any)=>{
      console.log(data);
    })

    this.todoForm.reset();

  }

  updateTask(){
    this.tasks[this.updateId].title=this.todoForm.value.title;
    this.tasks[this.updateId].body=this.todoForm.value.body;
    this.api.updateTask(this.tasks[this.updateId]._id,this.tasks[this.updateId]).subscribe((data:any)=>{
      console.log("updated succesfully : "+this.tasks[this.updateId]);
    })
    this.isEditEnabled=false;
    this.updateId=undefined;
    this.todoForm.reset();

  }
  onEdit(items:ITask, i: number){
    this.isEditEnabled=true;
    this.updateId=i;
    this.todoForm.setValue({
      title:items.title,
      body:items.body
    })

  }

  deleteTask(item:ITask){
    this.api.deleteTask(item._id).subscribe((data:any)=>{
      console.log("deleted succesfully");
    })
    this.tasks = this.tasks.filter((x)=>x._id !== item._id);
    this.inprogress = this.inprogress.filter((x)=>x._id !== item._id);
    this.done = this.done.filter((x)=>x._id !== item._id);
  }
  deleteInProgress(index:number){
    this.api.deleteTask(this.inprogress[index]._id).subscribe((data:any)=>{
      console.log("deleted succesfully");
    })
    this.inprogress.splice(index,1);
  }
  deleteDone(index:number){
    this.api.deleteTask(this.done[index]._id).subscribe((data:any)=>{
      console.log("deleted succesfully");
    })
    this.done.splice(index,1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    console.log(event.item.data)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // if containers are changed
      switch (event.container.id.at(-1)){
        case '0': {
          this.api.updateTask(event.item.data._id, {status: 'todo'}).subscribe()
          break;
        }
        case '1': {
          this.api.updateTask(event.item.data._id, {status: 'working'}).subscribe()
          break;
        }
        case '2': {
          this.api.updateTask(event.item.data._id, {status: 'done'}).subscribe()
          break;
        }
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

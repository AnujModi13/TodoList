export interface ITask{
  _id?:string,
  title:string,
  body:string,
  status?:'todo'|'working'|'done',
  creationDate?:Date,
  finishedDate?:Date,
}

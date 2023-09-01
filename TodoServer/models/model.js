import mongoose, { Schema } from 'mongoose';

const TodoItem = new Schema({
  
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["todo", "working", "done"],
    default: "todo",
  },
  finishedDate:{
    type:Date,
    default:null}
});


export const TodoItemModel = mongoose.model('TodoItemModel', TodoItem);

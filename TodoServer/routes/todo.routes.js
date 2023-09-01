import { Router } from "express";
import { TodoItemModel } from "../models/model.js";

const todoRouter = Router()

// LIST
todoRouter.get("/", async (req, res) => {
  const response = await TodoItemModel.find()
  res.json(response)
})


// CREATE
todoRouter.post("/", async (req, res) => {
  const createdObject = await TodoItemModel.create(req.body)
  res.json(createdObject)
})


// GET
todoRouter.get("/:id", async (req, res) => {
  const todoFromDb = await TodoItemModel.findById(req.params["id"])
  if (todoFromDb == null) {
    return res.status(404).send("Todo with ID not available")
  }
  res.json(todoFromDb)
})

// UPDATE
todoRouter.patch("/:id", async (req, res) => {
  const updatedTodo = await TodoItemModel.findByIdAndUpdate(req.params["id"], req.body, { new: true })
  if (updatedTodo == null) {
    return res.status(404).send("Todo with ID not available")
  }
  res.json(updatedTodo)
})

// DELETE
todoRouter.delete("/:id", async (req, res) => {
  const deletedResponse = await TodoItemModel.findByIdAndDelete(req.params["id"]);
  if (deletedResponse == null) {
    return res.status(404).send("Todo with ID not available")
  }
  res.status(200).send()
})

export default todoRouter;


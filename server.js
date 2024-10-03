import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";

dotenv.config();
const app = express();
const port = process.env.port || 4000;
app.use(express.json());
connectToDB();
app.get("/todos", async (req, res) => {
  // res.send({ success: true, message: "server is active" });
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: "Todo lists retreived successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed ro  retreived todo lists successfully",
      data: result,
    });
  }
});
app.post("/create-todo", async (req, res) => {
  const todoDetails = req.body;
  try {
    const result = await Todo.create(todoDetails);
    res.send({
      success: true,
      message: "Todo created successfully",
      data: todoDetails,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "failed to create todo",
      data: todoDetails,
    });
  }
});
//
app.get("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const result = await Todo.findById(todoId);
    res.send({
      success: true,
      message: "Todo is retreived successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to retreived the todo",
      data: result,
    });
  }
});
app.patch("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const updatedTodo = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    res.send({
      success: true,
      message: "Todo is updated successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "failed to update todo",
      data: result,
    });
  }
});
app.delete("/delete/:todoId", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.todoId);
    res.send({
      success: true,
      message: "Todo is deleted successfully",
      data: null,
    });
  } catch (error) {
    res.send({
      success: true,
      message: "failed to delete Todo list",
      data: null,
    });
  }
});
app.listen(port, () => {
  console.log(`server isn listening on port ${port}`);
});

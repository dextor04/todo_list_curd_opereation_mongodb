import mongoose, { model, Schema } from "mongoose";
const todoSchema = new Schema({
  text: { type: String, required: true },
  priority: { type: String, required: true },
  deadline: { type: String, required: true },
});

export const Todo = mongoose.models.Todo || new model("Todo", todoSchema);

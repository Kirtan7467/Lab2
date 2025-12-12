import { Request, Response } from "express";
import TodoData from "../models/TodoData.js";

export const getTodoData = async (_: Request, res: Response) => {
  const datas = await TodoData.find().sort({ createdAt: -1 });
  res.json(datas);
};

export const createTodoData = async (req: Request, res: Response) => {
  const data = await TodoData.create(req.body);
  res.status(201).json(data);
};

export const updateTodoData = async (req: Request, res: Response) => {
  try {
    const updatedData = await TodoData.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    
    if (!updatedData) {
       res.status(404).json({ message: "Todo not found" });
       return; 
    }

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

export const deleteTodoData = async (req: Request, res: Response) => {
  await TodoData.findByIdAndDelete(req.params.id);
  res.json({ message: "TodoData deleted" });
};
 
import { Router } from "express";
import { getTodoData, createTodoData, deleteTodoData,updateTodoData } from "../controllers/TodoDataController.js";

const router = Router();

router.get("/", getTodoData);
router.post("/", createTodoData);
router.delete("/:id", deleteTodoData);
router.put("/:id",updateTodoData);

export default router;

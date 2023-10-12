import express from "express";
import {
  getAllTasks,
  newTask,
  markAsComplete,
  deleteTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/allTasks", isAuthenticated, getAllTasks);
router
  .route("/:id")
  .put(isAuthenticated, markAsComplete)
  .delete(isAuthenticated, deleteTask);

export default router;

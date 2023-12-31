import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsComplete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found.", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(201).json({
      success: true,
      message: "Task updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found.", 404));

    await task.deleteOne();

    res.status(201).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

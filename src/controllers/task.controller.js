import mongoose from "mongoose";
import Task from "../models/task.model.js";

/**
 *
 * * create task
 *
 */
export const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(403).json({ message: "Title is required" });
  const newTask = new Task(req.body);

  try {
    const taskSave = await newTask.save();
    res.status(201).json(taskSave);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * get all task
 *
 */
export const getAllTask = async (req, res) => {
  const tasks = await Task.find();
  !!tasks.length ? res.status(200).json(tasks) : res.status(204).send();
};
/**
 *
 * * get task by ID
 *
 */
export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    !!task
      ? res.status(200).json(task)
      : res.status(403).json({ message: "Task does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * update task
 *
 */
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, update, { new: true });
    !!task
      ? res.status(200).json(task)
      : res.status(403).json({ message: "Task does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * delete task
 *
 */
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    !!task
      ? res.status(200).json(task)
      : res.status(403).json({ message: "Task does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * assign task
 *
 */
export const assignTask = async (req, res) => {
  const { id } = req.params;
  const { arrAssigneds } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(403).json({ message: "Task does not exist" });

    task.assigneds = [...arrAssigneds];
    task.save();

    res.status(200).json({ assigneds: task.assigneds });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * get tasks by board ID
 *
 */
export const getTasksByBoardId = async (req, res) => {
  const { id: boardID } = req.params;

  try {
    const taskAssigneds = await Task.find({ board: boardID }).populate({
      path: "assigneds",
      select: "name",
    });
    res.status(200).json(taskAssigneds);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }

  // res.send(`get tasks by board ${ids}`);
};

import mongoose from "mongoose";
import Board from "../models/board.model.js";

/**
 *
 * * create board
 *
 */
export const createBoard = async (req, res) => {
  const { title, owner } = req.body;

  if (!title) return res.status(403).json({ message: "Title is required" });
  if (!owner) return res.status(403).json({ message: "Owner is required" });

  const newBoard = new Board(req.body);

  try {
    const boardSave = await newBoard.save();
    res.status(201).json(boardSave);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * get all boards
 *
 */
export const getAllBoards = async (req, res) => {
  const boards = await Board.find();
  // .populate({ path: "owner", select: "name" })
  // .populate({ path: "guests", select: "name" });
  !!boards.length ? res.status(200).json(boards) : res.status(204).send();
};
/**
 *
 * * get board by ID
 *
 */
export const getBoardById = async (req, res) => {
  const { id } = req.params;

  try {
    const board = await Board.findById(id)
      .populate({ path: "owner", select: "name" })
      .populate({ path: "guests", select: "name" })
      .populate({
        path: "tasks",
        select: {
          title: 1,
          assigneds: 1,
          complete: 1,
        },
      });
    !!board
      ? res.status(200).json(board)
      : res.status(403).json({ message: "Board does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * update board
 *
 */
export const updateBoard = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const board = await Board.findByIdAndUpdate(id, update, { new: true });
    !!board
      ? res.status(200).json(board)
      : res.status(403).json({ message: "Board does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * delete board
 *
 */
export const deleteBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const board = await Board.findByIdAndDelete(id);
    !!board
      ? res.status(200).json(board)
      : res.status(403).json({ message: "Board does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * get boards by user ID
 *
 */
export const getBoardsByUserId = async (req, res) => {
  const { id: userID } = req.params;

  try {
    const boardOwner = await Board.find({ owner: userID })
      // .populate({ path: "owner", select: "name" })
      .populate({ path: "tasks", select: { complete: 1, title: 1 } });
    const boardGuest = await Board.find()
      .where("guests")
      .all([userID])
      // .populate({ path: "owner", select: "name" })
      .populate({ path: "tasks", select: { complete: 1, title: 1 } });

    res.status(200).json({ boardOwner, boardGuest });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * add guest in board
 *
 */
export const addGuestInBoard = async (req, res) => {
  const { boardID } = req.params;
  const { arrGuests } = req.body;

  try {
    const board = await Board.findById(boardID);
    if (!board)
      return res.status(403).json({ message: "Board does not exist" });

    board.guests = [...arrGuests];
    board.save();

    res.status(200).json({ guests: board.guests });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * add task in board
 *
 */
export const addTaskInBoard = async (req, res) => {
  const { boardID } = req.params;
  const { taskID } = req.body;

  try {
    const board = await Board.findById(boardID);
    if (!board)
      return res.status(403).json({ message: "Board does not exist" });

    board.tasks = [...board.tasks, taskID];
    board.save();

    res.status(200).json(board);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * remove task in board
 *
 */
export const removeTaskInBoard = async (req, res) => {
  const { boardID } = req.params;
  const { taskID } = req.body;

  try {
    const board = await Board.findById(boardID);
    if (!board)
      return res.status(403).json({ message: "Board does not exist" });

    console.log(JSON.stringify(board.tasks[0]) === JSON.stringify(taskID));

    board.tasks = board.tasks.filter(
      id => JSON.stringify(id) !== JSON.stringify(taskID)
    );
    board.save();

    res.status(200).json(board);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import { Task } from "./entity/Task.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  const taskRepo = AppDataSource.getRepository(Task);

  // GET all tasks
  app.get("/tasks", async (req, res) => {
    const tasks = await taskRepo.find();
    res.json(tasks);
  });

  // POST create task
  app.post("/tasks", async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    if (!title || !status) return res.status(400).json({ message: "Title and status are required." });
    const task = taskRepo.create({ title, description, status, dueDate });
    const result = await taskRepo.save(task);
    res.status(201).json(result);
  });

  // PUT update task
  app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const task = await taskRepo.findOneBy({ id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, description, status, dueDate } = req.body;
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    const result = await taskRepo.save(task);
    res.json(result);
  });

  // DELETE task
  app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const result = await taskRepo.delete({ id });
    if (result.affected === 0) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
  });

  // Start server
  app.listen(process.env.PORT, () => {
    console.log(`Backend running on http://localhost:${process.env.PORT}`);
  });
}).catch(err => console.error("Data Source initialization error:", err));

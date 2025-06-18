// src/data-source.js (or wherever your DataSource is)
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/Task.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Task],
});

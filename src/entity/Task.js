// src/entity/Task.js
import { EntitySchema } from "typeorm";

export const Task = new EntitySchema({
  name: "Task",
  tableName: "tasks",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },
    title: {
      type: "varchar"
    },
    description: {
      type: "text",
      nullable: true
    },
    status: {
      type: "varchar"
    },
    dueDate: {
      type: "datetime",
      nullable: true
    },
    createdAt: {
      type: "datetime",
      createDate: true
    },
    updatedAt: {
      type: "datetime",
      updateDate: true
    }
  }
});

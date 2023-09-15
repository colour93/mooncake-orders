import "reflect-metadata";
import { DataSource } from "typeorm";
import { db } from "./config.json";

import { Activity } from "@/entities/Activity";

export const AppDataSource = new DataSource({
  type: "mysql",
  entities: [Activity],
  synchronize: true,
  ...db,
});

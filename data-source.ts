import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config.json";

import { Activity } from "./entities/Activity";
import { ActivateCode } from "./entities/ActivateCode";
import { BakingList } from "./entities/BakingList";
import { Mooncake } from "./entities/Mooncake";
import { MooncakeMould } from "./entities/MooncakeMould";
import { MooncakeType } from "./entities/MooncakeType";
import { MooncakeMouldSeries } from "./entities/MooncakeMouldSeries";
import { Order } from "./entities/Order";
import { OTP } from "./entities/OTP";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  // entities: ["./entities/*.ts"],
  entities: [
    ActivateCode,
    Activity,
    BakingList,
    Mooncake,
    MooncakeMould,
    MooncakeMouldSeries,
    MooncakeType,
    Order,
    OTP,
    User,
  ],
  synchronize: true,
  logging: false,
  ...config.db,
});

AppDataSource.initialize()
  .then(() => {
    console.log("database initialized");
  })
  .catch((error) => console.log(error));

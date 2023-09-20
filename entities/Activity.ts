import * as typeorm from "typeorm";
import { MooncakeMouldSeries } from "./MooncakeMouldSeries";
import { MooncakeType } from "./MooncakeType";

export enum ActivityStatus {
  IN_PROGRESS = 1,
  FINISHED = 2,
}

@typeorm.Entity()
export class Activity {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;

  @typeorm.Column({ unique: true })
  name!: string;

  // @Column({ default: ActivityStatus.IN_PROGRESS })
  // status!: ActivityStatus;

  @typeorm.Column({ type: "decimal", precision: 10, scale: 2, default: 20 })
  price!: number;

  @typeorm.Column({ type: "datetime", precision: 6, name: "end_time" })
  endTime!: Date;

  @typeorm.ManyToMany(
    (type) => MooncakeMouldSeries,
    (mooncakeMouldSeries) => mooncakeMouldSeries.activities
  )
  @typeorm.JoinTable()
  mooncakeMouldSeries?: typeorm.Relation<MooncakeMouldSeries[]>;

  @typeorm.ManyToMany((type) => MooncakeType, (mooncakeType) => mooncakeType.activities)
  @typeorm.JoinTable()
  mooncakeTypes?: typeorm.Relation<MooncakeType[]>;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

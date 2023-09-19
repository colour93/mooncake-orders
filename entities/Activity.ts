import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  Relation,
} from "typeorm";
import { MooncakeMouldSeries } from "./MooncakeMouldSeries";
import { MooncakeType } from "./MooncakeType";

export enum ActivityStatus {
  IN_PROGRESS = 1,
  FINISHED = 2,
}

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  // @Column({ default: ActivityStatus.IN_PROGRESS })
  // status!: ActivityStatus;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 20 })
  price!: number;

  @Column({ type: "datetime", precision: 6, name: "end_time" })
  endTime!: Date;

  @ManyToMany(
    (type) => MooncakeMouldSeries,
    (mooncakeMouldSeries) => mooncakeMouldSeries.activities
  )
  @JoinTable()
  mooncakeMouldSeries?: Relation<MooncakeMouldSeries[]>;

  @ManyToMany((type) => MooncakeType, (mooncakeType) => mooncakeType.activities)
  @JoinTable()
  mooncakeTypes?: Relation<MooncakeType[]>;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

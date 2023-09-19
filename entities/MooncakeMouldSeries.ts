import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
} from "typeorm";
import { Activity } from "./Activity";

@Entity()
export class MooncakeMouldSeries {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  name!: string;

  @ManyToMany((type) => Activity, (activity) => activity.mooncakeMouldSeries)
  activities?: Activity[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  ManyToMany,
  Relation,
} from "typeorm";
import { Activity } from "./Activity";

@Entity()
export class MooncakeType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  link?: string;

  @ManyToMany((type) => Activity, (activity) => activity.mooncakeTypes)
  activities?: Relation<Activity[]>;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

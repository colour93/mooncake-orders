import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Activity } from "./Activity";
import { MooncakeType } from "./MooncakeType";

@Entity()
export class BakingList {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Activity)
  @JoinColumn()
  activity!: Activity;

  @ManyToOne(() => MooncakeType)
  @JoinColumn()
  type!: MooncakeType;

  @Column({ type: "datetime", precision: 6 })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

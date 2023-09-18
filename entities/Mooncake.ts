import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
} from "typeorm";
import { MooncakeMould } from "./MooncakeMould";
import { MooncakeType } from "./MooncakeType";
import { Activity } from "./Activity";
import { Order } from "./Order";

export enum MooncakeStatus {
  CREATED = 1,
  PRINTED = 2,
  BAKING = 3,
  BAKED = 4,
  PACKAGED = 5,
}

@Entity()
export class Mooncake {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Activity)
  @JoinColumn()
  activity!: Activity;

  @ManyToOne(() => MooncakeType)
  @JoinColumn()
  type!: MooncakeType;

  @ManyToOne(() => MooncakeMould)
  @JoinColumn()
  mould!: MooncakeMould;

  @ManyToOne(() => Order, (order) => order.mooncakes)
  order!: Order;

  @Column({ default: MooncakeStatus.CREATED })
  status!: MooncakeStatus;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  baked?: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
    this.updated = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updated = new Date();
  }
}

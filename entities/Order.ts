import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { MooncakeMould } from "./MooncakeMould";
import { MooncakeType } from "./MooncakeType";
import { Activity } from "./Activity";
import { Mooncake } from "./Mooncake";

export enum OrderStatus {
  CREATED = 1,
  BAKING = 2,
  PACKAGED = 3,
  DELIVERING = 4,
  DONE = 5,
}

@Entity()
export class Order {
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

  @OneToMany(() => Mooncake, (mooncake) => mooncake.order)
  mooncakes?: Mooncake[];

  @Column({ default: OrderStatus.CREATED })
  status!: OrderStatus;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 10 })
  freight!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 20 })
  price!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 30 })
  cost!: number;

  @Column({ default: false, name: "is_paid" })
  isPaid!: boolean;

  @Column({ name: "delivery_phone" })
  deliveryPhone!: number;

  @Column({ name: "delivery_address" })
  deliveryAddress!: string;

  @Column({ name: "delivery_name" })
  deliveryName!: string;

  @Column({ name: "delivery_id" })
  deliveryId!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
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
    this.cost = this.freight + this.price;
  }
}

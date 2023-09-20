import * as typeorm from "typeorm";
import { Activity } from "./Activity";
import { Mooncake } from "./Mooncake";
import { User } from "./User";

export enum OrderStatus {
  CREATED = 1,
  BAKING = 2,
  PACKAGED = 3,
  DELIVERING = 4,
  DONE = 5,
}

@typeorm.Entity()
export class Order {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;

  @typeorm.ManyToOne(() => User, (user) => user.orders)
  @typeorm.JoinColumn()
  user!: typeorm.Relation<User>;

  @typeorm.ManyToOne(() => Activity)
  @typeorm.JoinColumn()
  activity!: typeorm.Relation<Activity>;

  @typeorm.OneToMany(() => Mooncake, (mooncake) => mooncake.order)
  mooncakes?: typeorm.Relation<Mooncake[]>;

  @typeorm.Column({ default: OrderStatus.CREATED })
  status!: OrderStatus;

  @typeorm.Column({ type: "decimal", precision: 10, scale: 2, default: 15 })
  freight!: number;

  @typeorm.Column({ type: "decimal", precision: 10, scale: 2, default: 20 })
  price!: number;

  @typeorm.Column({ type: "decimal", precision: 10, scale: 2, default: 35 })
  cost!: number;

  @typeorm.Column({ default: false, name: "is_paid" })
  isPaid!: boolean;

  @typeorm.Column({ name: "delivery_phone" })
  deliveryPhone!: number;

  @typeorm.Column({ name: "delivery_address" })
  deliveryAddress!: string;

  @typeorm.Column({ name: "delivery_name" })
  deliveryName!: string;

  @typeorm.Column({ name: "delivery_id", default: null })
  deliveryId?: string;

  @typeorm.Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated!: Date;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
    this.updated = new Date();
  }

  @typeorm.BeforeUpdate()
  async beforeUpdate() {
    this.updated = new Date();
    console.log(this.freight);
    console.log(this.price);
    this.cost = this.freight + this.price;
  }
}

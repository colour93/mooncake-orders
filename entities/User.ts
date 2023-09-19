import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  Relation,
} from "typeorm";
import { Order } from "./Order";

export enum UserRole {
  COMMON = 1,
  MANAGER = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column({ default: UserRole.COMMON })
  role!: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Relation<Order[]>;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

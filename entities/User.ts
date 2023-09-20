import * as typeorm from "typeorm";
import { Order } from "./Order";

export enum UserRole {
  COMMON = 1,
  MANAGER = 2,
}

@typeorm.Entity()
export class User {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;

  @typeorm.Column({ unique: true })
  email!: string;

  @typeorm.Column()
  name!: string;

  @typeorm.Column({ default: UserRole.COMMON })
  role!: UserRole;

  @typeorm.OneToMany(() => Order, (order) => order.user)
  orders?: typeorm.Relation<Order[]>;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

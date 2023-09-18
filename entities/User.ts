import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";

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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

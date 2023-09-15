import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
} from "typeorm";

export enum ActivityStatus {
  IN_PROGRESS = 1,
  FINISHED = 2,
}

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  status!: ActivityStatus;

  // @ManyToOne()
  // orders!:

  @Column({ type: "decimal", precision: 10, scale: 2, default: 20 })
  price!: number;

  @Column({ type: "datetime", precision: 6, name: "end_time" })
  endTime!: Date;

  @Column({ type: "datetime", precision: 6 })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

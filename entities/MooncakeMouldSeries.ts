import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from "typeorm";

@Entity()
export class MooncakeMouldSeries {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "datetime", precision: 6 })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

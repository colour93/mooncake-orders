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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { MooncakeMouldSeries } from "./MooncakeMouldSeries";

@Entity()
export class MooncakeMould {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => MooncakeMouldSeries)
  @JoinColumn()
  series!: MooncakeMouldSeries;

  @Column({ type: "datetime", precision: 6 })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

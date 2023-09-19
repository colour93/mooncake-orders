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

  @Column()
  image?: string;

  @ManyToOne(() => MooncakeMouldSeries)
  @JoinColumn()
  series!: MooncakeMouldSeries;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

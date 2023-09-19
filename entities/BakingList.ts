import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation,
} from "typeorm";
import { Activity } from "./Activity";
import { MooncakeType } from "./MooncakeType";
import { Mooncake } from "./Mooncake";

@Entity()
export class BakingList {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Activity)
  @JoinColumn()
  activity!: Relation<Activity>;

  @ManyToOne(() => MooncakeType)
  @JoinColumn()
  mooncakeType!: Relation<MooncakeType>;

  @OneToMany(() => Mooncake, (mooncake) => mooncake.bakingList)
  @JoinColumn()
  mooncakes?: Relation<Mooncake[]>;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

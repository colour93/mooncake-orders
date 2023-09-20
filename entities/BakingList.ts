import * as typeorm from "typeorm";
import { Activity } from "./Activity";
import { MooncakeType } from "./MooncakeType";
import { Mooncake } from "./Mooncake";

@typeorm.Entity()
export class BakingList {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;

  @typeorm.ManyToOne(() => Activity)
  @typeorm.JoinColumn()
  activity!: typeorm.Relation<Activity>;

  @typeorm.ManyToOne(() => MooncakeType)
  @typeorm.JoinColumn()
  mooncakeType!: typeorm.Relation<MooncakeType>;

  @typeorm.OneToMany(() => Mooncake, (mooncake) => mooncake.bakingList)
  @typeorm.JoinColumn()
  mooncakes?: typeorm.Relation<Mooncake[]>;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

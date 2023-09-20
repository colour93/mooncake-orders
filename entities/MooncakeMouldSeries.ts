import * as typeorm from "typeorm";
import { Activity } from "./Activity";

@typeorm.Entity()
export class MooncakeMouldSeries {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;
  
  @typeorm.Column()
  name!: string;

  @typeorm.ManyToMany((type) => Activity, (activity) => activity.mooncakeMouldSeries)
  activities?: typeorm.Relation<Activity[]>;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

import * as typeorm from "typeorm";
import { Activity } from "./Activity";

@typeorm.Entity()
export class MooncakeType {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;

  @typeorm.Column({ unique: true })
  name!: string;

  @typeorm.Column()
  link?: string;

  @typeorm.ManyToMany((type) => Activity, (activity) => activity.mooncakeTypes)
  activities?: typeorm.Relation<Activity[]>;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

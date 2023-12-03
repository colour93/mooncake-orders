import * as typeorm from "typeorm";
import { Activity } from "./Activity";

@typeorm.Entity()
export class ActivateCode {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;

  @typeorm.Column({ unique: true })
  code!: string;

  @typeorm.Column({ default: false })
  used!: boolean;

  @typeorm.ManyToOne(() => Activity)
  @typeorm.JoinColumn()
  activity!: typeorm.Relation<Activity>;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

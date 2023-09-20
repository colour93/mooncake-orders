import * as typeorm from "typeorm";
import { MooncakeMouldSeries } from "./MooncakeMouldSeries";

@typeorm.Entity()
export class MooncakeMould {
  @typeorm.PrimaryGeneratedColumn()
  id!: number;

  @typeorm.Column()
  name!: string;

  @typeorm.Column()
  image?: string;

  @typeorm.ManyToOne(() => MooncakeMouldSeries)
  @typeorm.JoinColumn()
  series!: typeorm.Relation<MooncakeMouldSeries>;

  @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @typeorm.BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class ActivateCode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column({ default: false })
  used!: boolean;

  @Column({ type: "datetime", precision: 6 })
  created!: Date;

  @BeforeInsert()
  async preProcess() {
    this.created = new Date();
  }
}

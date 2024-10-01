import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEnum } from "class-validator";
import { StatusLabel } from "./status.enum";

@Entity()
export default class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEnum(StatusLabel)
  label: string;
}

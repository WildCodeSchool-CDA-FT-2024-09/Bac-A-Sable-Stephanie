import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from "typeorm";
import { IsString } from "class-validator";

@Entity()
@Unique(["label"])
export default class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  label: string;
}

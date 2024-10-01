import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
// import { IsEnum } from "class-validator";
// import { StatusLabel } from "./status.enum";
import Repo from "../repos/repo.entity";

@Entity()
export default class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  //   @IsEnum(StatusLabel)
  label: string;
  @OneToMany(() => Repo, (repo) => repo.status)
  repos?: Repo[];
}

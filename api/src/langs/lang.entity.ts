import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from "typeorm";
import { IsString } from "class-validator";
import Repo from "../repos/repo.entity";

@Entity()
@Unique(["label"])
export default class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  label: string;

  @ManyToMany(() => Repo, (repo) => repo.languages)
  repos: Repo[];
}

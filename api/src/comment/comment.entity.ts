import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";

import Repo from "../repos/repo.entity";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  author: string;
  @Column()
  text: string;
  @ManyToOne(() => Repo, (repo: { comment: any }) => repo.comment)
  repo: Repo;
}

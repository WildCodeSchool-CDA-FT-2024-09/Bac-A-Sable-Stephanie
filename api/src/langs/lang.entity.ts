import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";

import { Field, ObjectType } from "type-graphql";
import { Repo } from "../repos/repo.entity";

@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [Repo])
  @ManyToMany(() => Repo, (repo) => repo.languages)
  repos: Repo[];
}

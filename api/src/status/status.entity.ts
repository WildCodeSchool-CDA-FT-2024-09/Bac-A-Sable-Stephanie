import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import { Repo } from "../repos/repo.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [Repo])
  @OneToMany(() => Repo, (repo) => repo.status)
  repos?: Repo[];
}

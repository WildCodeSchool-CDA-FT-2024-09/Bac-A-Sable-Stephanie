import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Repo } from "../repos/repo.entity";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column()
  text: string;

  @Field(() => Repo)
  @ManyToOne(() => Repo, (repo: { comment: any }) => repo.comment)
  repo: Repo;
}

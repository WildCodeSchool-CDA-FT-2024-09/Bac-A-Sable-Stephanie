import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Min, Max, IsString } from "class-validator";
import { Status } from "../status/status.entity";
import { Lang } from "../langs/lang.entity";
import { Comment } from "../comment/comment.entity";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  @IsString()
  id: string;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field()
  @Column()
  @IsString()
  url: string;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.repos)
  @JoinColumn({ name: "statusId" })
  @Min(1)
  @Max(2)
  status: Status;

  @Field(() => [Lang])
  @ManyToMany(() => Lang, (lang) => lang.repos)
  @JoinTable()
  languages?: Lang[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.repo)
  comments?: Comment[];
}
@ObjectType()
export class LightRepo extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;
}

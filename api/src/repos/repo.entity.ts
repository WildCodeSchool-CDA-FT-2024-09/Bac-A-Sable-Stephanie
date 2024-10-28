import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Min, Max, IsString } from "class-validator";
import Status from "../status/status.entity";
import Lang from "../langs/lang.entity";
@Entity()
@Unique(["id"])
export default class Repo extends BaseEntity {
  @PrimaryColumn() //{ unique: true }
  @IsString()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  url: string;

  @ManyToOne(() => Status, (status) => status.repos)
  @JoinColumn({ name: "statusId" })
  @Min(1)
  @Max(2)
  status: Status;

  @ManyToMany(() => Lang, (lang) => lang.repos)
  @JoinTable()
  languages?: Lang[];
}

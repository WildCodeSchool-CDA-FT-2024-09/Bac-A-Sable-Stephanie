import { BaseEntity, Entity, PrimaryColumn, Column, Unique } from "typeorm";
import { Min, Max, IsString } from "class-validator";

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

  @Column()
  @Min(1)
  @Max(2)
  isPrivate: number;
}

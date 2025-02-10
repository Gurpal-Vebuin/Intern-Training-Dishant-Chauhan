import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type rolesFormat = "admin" | "user";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: "varchar", length: 10 })
  phone: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
  })
  roles: rolesFormat;
}

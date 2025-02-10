import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({type:"varchar", length:10})
  phone: string;

  @Column()
  password: string;

  @Column()
  roles: string;
}

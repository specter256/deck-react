import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  create_date!: string;

  @Column()
  update_date!: string;
}

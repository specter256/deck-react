import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Tag } from './tag';

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

  @ManyToMany(type => Tag)
  @JoinTable()
  tags!: Tag[];
}

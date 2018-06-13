import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'user/user.entity';

@Entity('Todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column()
  done: boolean;

  @ManyToOne(type => User, user => user.todos)
  @JoinColumn()
  user : User
}
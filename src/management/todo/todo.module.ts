import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity'
import { UserModule } from 'user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UserModule],
  controllers: [TodosController],
  providers: [TodoService]
})
export class TodoModule {}

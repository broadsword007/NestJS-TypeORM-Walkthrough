import { Injectable } from '@nestjs/common';
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Todo } from './todo.entity'
import { User } from 'user/user.entity';
import { UserService } from 'user/user.service';
@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>, private readonly userService: UserService){
  }
  async getAllTodos(userid): Promise<Todo[]> {
    var user = await this.userService.getJoinedUser(userid)
    return (user==null ? null : user.todos)
  }
  async getTodoByID(id: number, userid: number): Promise<Todo> {
    try
    {
      var user = await this.userService.getJoinedUser(userid)
      if(user == null || user == undefined)
      {
        return null
      }
      else
      {
        var allTodos = user.todos
        return allTodos.find(function(todo: Todo){
          return todo.id==id
        })
      }
      //return this.todoRepository.findOne(id)
    }
    catch(exception)
    {
      console.log("Exception :", exception.toString(), " occured in getTodoById")
      return null
    }
  }
  async createTodo(info: Object, userid: number): Promise<Todo> {
    try
    {
        var user = await this.userService.getUserByID(userid)
        if(user == undefined)
        {
          return null
        }
        else
        {
          var todo = new Todo()
          todo.text = info["text"]
          todo.done = info["done"]
          todo.user = user
          return this.todoRepository.save(todo)
        }
    }
    catch(exception)
    {
        console.log("Exception :", exception, " occured in createTodo")
        return null
    }
  }
  async updateTodo(id: number, info: Object, userid: number): Promise<Todo> {
    try
    {
        // var todo = await this.todoRepository.findOne(id)
        // todo.text = info["text"]
        // todo.done = info["done"]
        // return this.todoRepository.save(todo)
        var todo = await this.getTodoByID(id, userid)
        if(todo == null || todo == undefined)
        {
          return null
        }
        else
        {
          todo.text = info["text"]
          todo.done = info["done"]
          return this.todoRepository.save(todo)
        }
    }
    catch(exception)
    {
        console.log("Exception :", exception, " occured in createTodo")
        return null
    }
  }
  async deleteTodo(id: number, userid: number): Promise<DeleteResult>{
    // try
    // {
    //     var res = await this.todoRepository.delete(id)
    //     return res
    // }
    // catch(exception)
    // {
    //     console.log("Exception :", exception, " occured in deleteTodo")
    //     return null
    // }
    var todo = await this.getTodoByID(id, userid)
    if(todo == null || todo == undefined)
    {
      return null
    }
    else
    {
      var res = await this.todoRepository.delete(todo.id)
      return res
    }
  }
}

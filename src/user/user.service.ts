import { Injectable } from '@nestjs/common';
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'
import { Todo } from 'management/todo/todo.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>){
  }
  getUserByID(id: number): Promise<User> {
    try
    {
        return this.userRepository.findOne(id)
    }
    catch(exception)
    {
      console.log("Exception :", exception.toString(), " occured in getUserByID")
      return null
    }
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  create(params): Promise<User> {
    console.log("Create user with params{Service} : ", params)
    var user = new User()
    user.email = params.email
    user.password = params.password
    user.name = params.name
    return this.userRepository.save(user)
  }
  async getJoinedUser(userid: number): Promise<User>{ // Returns a user with a userid joined with its relations
    var users = await this.userRepository.find({ 
      select: ["id", "name", "email", "password"],
      relations: ["todos"],
      where: { 
          id: userid
      }
    })
    return (users.length>0 ? users[0]: null)
  }
}

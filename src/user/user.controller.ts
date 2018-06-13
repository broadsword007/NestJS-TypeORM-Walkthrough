import { Get, Controller, Post, Patch, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
const ParamFilter = require('filter-params')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAll(): Promise<User[]> {
      var res = await this.userService.findAll()
      if(res == undefined)
      {
        return []
      }
      else
      {
        return res
      }
  }
  @Post('/')
  async create(@Body() params): Promise<User> {
    console.log("Create user with params : ", params)
    if(params["email"]!=undefined && params["password"]!=undefined)
    {
      var filteredParams = {
        name : params["name"],
        email: params["email"],
        password: params["password"]
      }
      var res = await this.userService.create(filteredParams)
      if(res == undefined)
      {
        return null
      }
      else
      {
        return res
      }
    }
    else
    {
      return null
    }
}
}

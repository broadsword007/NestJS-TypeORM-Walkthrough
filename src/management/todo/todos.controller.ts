import { Get, Controller, Post, Patch, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity'
@Controller('users/:userid/todos')
export class TodosController {
  constructor(private readonly TodoDBService: TodoService) {}

  @Get('/')         //-- get all todos
  async getAll(@Param() params): Promise<Array<Todo>> {
    return await this.TodoDBService.getAllTodos(params.userid)
  }
  @Get('/:id')      //-- get a specific todo
  async get(@Param() params): Promise<Todo> {
    var todo = await this.TodoDBService.getTodoByID(params.id, params.userid)
    return (todo==null ? undefined : todo)
  }
  @Post('/')        //-- create a todo
  async create(@Body() postData, @Param() params): Promise<Object> {
    if(postData.text!=undefined && postData.done!=undefined)
    {
      console.log("Running1")
      var obj = {
          text : postData["text"],
          done : postData["done"]
      }
      console.log("Creating : ", obj)
      var res = await this.TodoDBService.createTodo(obj, params.userid)
      if(res==undefined || res==null)
      {
        console.log("Running6")
        return {
          success: false,
          reason: null,
          createdID: null
        }
      }
      else
      {
        return {
          success: true,
          reason: null,
          createdID: res.id
        }
      }
    }
    else return {
      success: false,
      reason: "Invalid Parameters"
    }
  }
  @Put('/:id')      //-- update a todo
  async update(@Body() postData, @Param() params): Promise<Object> {
    if(postData["text"]!=undefined && postData["done"]!=undefined)
      {
          var obj = {
              text : postData["text"],
              done: postData["done"]
          }
          console.log("Updating to : ", obj)
          var updateResult = await this.TodoDBService.updateTodo(params.id, obj, params.userid)
          if(updateResult)
          {
            return {
              success: true,
              reason: null,
              updatedID: updateResult.id
            }
          }
          else
          {
            return {
              success: false,
              reason: "Internal server error",
              updatedID: null
            }
          }
      }
      else return {
        success: false,
        reason: "Invalid Parameters",
        updatedID: null
      }
  }

  @Delete('/:id')   //-- delete a todo
  async delete(@Param() params): Promise<Object> {
    var todo = await this.TodoDBService.deleteTodo(params.id, params.userid)
    if(todo)
    {
      return {
        success: true,
        reason: null
      }
    }
    else
    {
      return {
        success: false,
        reason: "Internal Server Error"
      }
    }
  }
}

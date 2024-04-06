import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserIdParamsDto } from './dto/creat-user-is';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
   create(@Body() createUserDto: CreateUserDto): Promise<User>{
    return   this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne( @Param() Param: UserIdParamsDto ): Promise <User> {
const {id} = Param 
 return await this.userService.findOne(id)
  }

 @Patch(':id')
 async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() Param :UserIdParamsDto) : Promise <User> {
    const {id} =Param
    return this.userService.remove(id);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { Collection, Model, ObjectId, isValidObjectId } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name)private userModel: Model<User> ){}
   async create(createUserDto: CreateUserDto):Promise <User> {
    const user = new this.userModel(createUserDto)
    const savedUser = await user.save()
    return savedUser
   }

   async findAll() : Promise <User[]> {

    const users  = await this.userModel.find()

    return  users

    
  }

  async findById(id: mongoose.Schema.Types.ObjectId): Promise<User> {
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Id is invalid');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }


 async findOne(id: string) : Promise <User>{
   const user = await this.userModel.findById(id)
   return user
  }

   async update(id: string, updateUserDto: UpdateUserDto) :Promise <User> {
    const user = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
    return user
   }
  

  async remove(id: string) : Promise <User> {
    const user = await this.userModel.findByIdAndDelete(id)
   return user
  }
  async addPost(userId: ObjectId, postId: ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.posts.push(postId);
    await user.save();
  }
}


import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';


@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name)private readonly postModel: Model <Post>,
   private readonly userService:UserService
  ){}
 async create(createPostDto: CreatePostDto )  { 
  const user = await this.userService.findById(createPostDto.user)
  if(!user){
    throw new BadRequestException("user not found")
  }

  const post = await this.postModel.create(createPostDto);

  this.userService.addPost(user._id, post._id);

  return await post.populate('user');
}

 findAll() {
    return this.postModel.find().populate('user');
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

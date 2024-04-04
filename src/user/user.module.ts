import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema:userSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

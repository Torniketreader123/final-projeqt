import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import mongoose, { Document } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema()
export class Post extends Document {
    @Prop()
    content: string;

    @Prop()

    text:string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: mongoose.Schema.Types.ObjectId;
  }


    

 
export const PostSchema = SchemaFactory.createForClass(Post)

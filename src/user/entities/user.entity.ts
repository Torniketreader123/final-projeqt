import { Post } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


@Schema()
export class User extends Document{
    @Prop({unique:true})
    email : string;

    @Prop()
    password:string;

    @Prop([{type:mongoose.Schema.Types.ObjectId,ref:  'Post'}])
    posts : mongoose.Schema.Types.ObjectId[];


}

export const userSchema = SchemaFactory.createForClass(User) ;

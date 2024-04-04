import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  
  email: string;

  
  password: string;
}

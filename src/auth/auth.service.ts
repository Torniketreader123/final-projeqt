import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up-dto';
import { SignInDto } from './dto/sign-in-dto.';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const existingUser = await this.userService.findOne(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    await this.userService.create({ email, password: hashedPasword });
    return { success: true, message: 'Register successful' };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwtPayload = {
      email,
    };

    const access_token = await this.jwtService.sign(jwtPayload);

    return { access_token };
  }

  getCurrentUser(email: string) {
    return this.userService.findByEmail(email);
  }
}
  



import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserInfo } from './userInfo';
import { EmailVerifyDto } from './dto/emailVerify.dto';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('users')
export class UsersController {
  @Post()
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    const { name, email, password } = signUpDto;
    if (!name || !email || !password) {
      throw new BadRequestException();
    }
    console.log(signUpDto);
    console.log(name, email, password);
  }

  @Post('email-verify')
  async verifyEmail(@Query() emailVerifyDto: EmailVerifyDto): Promise<string> {
    const { signupVerifyToken } = emailVerifyDto;
    if (!signupVerifyToken) {
      throw new BadRequestException();
    }
    console.log(emailVerifyDto);
    return;
  }

  @Post('login')
  async logIn(@Body() logInDto: LogInDto): Promise<string> {
    const { email, password } = logInDto;
    if (!email || !password) {
      throw new BadRequestException();
    }
    console.log(logInDto);
    return;
  }

  @Get(':id')
  async getUserInfo(@Param('id') id: string): Promise<UserInfo> {
    console.log(id);
    return;
  }
}

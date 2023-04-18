import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { EmailVerifyDto } from './dto/emailVerify.dto';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() signUpDto: SignUpDto): Promise<void> {
    const { name, email, password } = signUpDto;

    if (!name || !email || !password) {
      throw new BadRequestException();
    }

    await this.usersService.createUser(name, email, password);
  }

  @Post('email-verify')
  async verifyEmail(@Query() emailVerifyDto: EmailVerifyDto): Promise<string> {
    const { signupVerifyToken } = emailVerifyDto;
    if (!signupVerifyToken) {
      throw new BadRequestException();
    }
    console.log(emailVerifyDto);
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('login')
  async logIn(@Body() logInDto: LogInDto): Promise<string> {
    const { email, password } = logInDto;
    if (!email || !password) {
      throw new BadRequestException();
    }
    console.log(logInDto);
    return await this.usersService.logIn(email, password);
  }

  @Get(':id')
  async getUserInfo(@Param('id', ParseIntPipe) id) {
    console.log(id);
    console.log(typeof id);
    return await this.usersService.getUserInfo(id);
  }

  @Get()
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
    return await this.usersService.findAll();
  }
}

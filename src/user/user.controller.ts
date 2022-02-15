import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	){}

	@Post('register')
	createUser(
			@Body() userData: CreateUserDto,
		): Promise<UserModel> {
		return this.userService.createUser(userData);
	}

}
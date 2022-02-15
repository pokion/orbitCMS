import { Controller, Get, Param, Post, Body, Put, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

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

	@Post()
	loginUser(
			@Body() userData: LoginUserDto,
		): Promise<{accessToken: UserModel["accessToken"]}> {
		return this.userService.loginUser(userData);
	}

	@Patch()
	updateUser(
			@Body() userData: UpdateUserDto,
		): Promise<UserModel> {
		return this.userService.updateUser(userData);
	}

}
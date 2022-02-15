import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService
		) {}

	async createUser(data: CreateUserDto): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(data.password, salt);

		data.password = hash;

		let returnUser = await this.prisma.user.create({data});
		delete returnUser.password;

		return returnUser; 
	}

	async loginUser(data: LoginUserDto): Promise<{accessToken: User["accessToken"]}> {
		let accessToken;
		const result = await this.prisma.user.findUnique({
			where: {
				id: data.id
			}
		})

		let compareHash = await bcrypt.compare(data.password, result.password);

		if(compareHash && data.email === result.email) {
			let payload = { email: result.email, id: result.id };

			accessToken = this.jwtService.sign(payload);

			let update = await this.prisma.user.update({
				where: { id: data.id },
				data: { accessToken },
				select: { accessToken: true }
			})

			return update;

		} else {
			throw new UnauthorizedException();
		}
	}

	async updateUser(data: UpdateUserDto): Promise<User> {
		let dataToUpdate = {...data};
		delete dataToUpdate.id;

		let userUpdated = await this.prisma.user.update({
			where: { id: data.id },
			data: { ...dataToUpdate }
		})

		delete userUpdated.password;
		delete userUpdated.accessToken;

		return userUpdated;
	}
}
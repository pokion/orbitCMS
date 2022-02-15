import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(data.password, salt);

		data.password = hash;

		return this.prisma.user.create({data})	
	}
}
import { IsEmail, IsJSON, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsEmail()
	@IsString()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	name?: string;

	@IsJSON()
	@IsOptional()
	ability?: string;
}
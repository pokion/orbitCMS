import { IsEmail, IsJSON, IsString, Matches,  IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@Matches(/(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9].*[0-9].*[0-9].*[0-9])/)
	@IsNotEmpty()
	@IsString()
	password: string;

	@IsJSON()
	@IsNotEmpty()
	ability: string;
}
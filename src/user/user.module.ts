import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from './../prisma/prisma.module';
import { RegisterMiddleware } from './middleware/register.middleware';
import { JwtModule } from '@nestjs/jwt';


@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
	PrismaModule,
	JwtModule.register({
		secret: "@K@#2n32o@(o",
		signOptions: { expiresIn: '2h' },
	}),
	],
})

export class UserModule {
	configure(consumer: MiddlewareConsumer){
		consumer.apply(RegisterMiddleware).forRoutes({ path: 'user/register', method: RequestMethod.POST });
	}
}
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from './../prisma/prisma.module';
import { RegisterMiddleware } from './middleware/register.middleware'


@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [PrismaModule]
})

export class UserModule {
	configure(consumer: MiddlewareConsumer){
		consumer.apply(RegisterMiddleware).forRoutes({ path: 'user/register', method: RequestMethod.POST });
	}
}
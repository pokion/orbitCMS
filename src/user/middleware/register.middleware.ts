import { Injectable, NestMiddleware, Logger, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP')

	use(req: Request, res: Response, next: NextFunction) {
		req.body.ability = JSON.stringify(req.body.ability);
		next();
	}
}
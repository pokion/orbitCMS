import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {

	use(req: Request, res: Response, next: NextFunction) {
		req.body.ability = JSON.stringify(req.body.ability);
		next();
	}
}
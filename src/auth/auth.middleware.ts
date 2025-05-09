import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismService: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    const username = parseInt(req.headers['x-username'], 10);
    if (!username) {
      throw new HttpException('Unauthorized', 401);
    }

    const user = await this.prismService.user.findUnique({
      where: {
        id: username,
      },
    });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}

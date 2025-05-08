import { Inject, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {
    console.info('Create User repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    this.logger.info(`create user with ${firstName} ${lastName}`);
    return this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
    console.info('Create Prisma service');
  }

  onModuleDestroy() {
    console.info('Disconnect: closing prisma connection');
    this.$disconnect();
  }

  onModuleInit() {
    console.info('Connect: opening prisma connection');
    this.$connect();
  }
}

export class PrismaModule {}

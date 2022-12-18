import { Module } from '@nestjs/common';
import { NotificationRepository } from '@application/repository/notification-repository';
import { PrismaNotificationRepository } from './prisma/repository/prisma-notification-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}

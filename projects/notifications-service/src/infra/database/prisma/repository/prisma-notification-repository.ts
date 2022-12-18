import { NotificationRepository } from '@application/repository/notification-repository';
import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '@infra/database/prisma/mapper/PrismaNotificationMapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: prismaNotificationData,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: prismaNotificationData.id,
      },
      data: prismaNotificationData,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}

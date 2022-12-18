import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { SendNotificationUseCase } from '@application/usecases/send-notification-usecase';
import { NotificationViewModel } from '@infra/http/view-model/notification-view-model';
import { CancelNotificationUseCase } from '@application/usecases/cancel-notification-usecase';
import { ReadNotificationUseCase } from '@application/usecases/read-notification-usecase';
import { UnreadNotificationUseCase } from '@application/usecases/unread-notification-usecase';
import { CountRecipientNotificationUseCase } from '@application/usecases/count-recipient-notifications-usecase';
import { GetRecipientNotificationUseCase } from '@application/usecases/get-recipient-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countRecipientNotificationUseCase: CountRecipientNotificationUseCase,
    private getRecipientNotificationUseCase: GetRecipientNotificationUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationUseCase.execute({
        recipientId,
      });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }
}

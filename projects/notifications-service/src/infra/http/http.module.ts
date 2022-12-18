import { Module } from '@nestjs/common';
import { NotificationsController } from './controller/notifications.controller';
import { SendNotificationUseCase } from '@application/usecases/send-notification-usecase';
import { DatabaseModule } from '../database/database.module';
import { CancelNotificationUseCase } from '@application/usecases/cancel-notification-usecase';
import { CountRecipientNotificationUseCase } from '@application/usecases/count-recipient-notifications-usecase';
import { GetRecipientNotificationUseCase } from '@application/usecases/get-recipient-notification';
import { ReadNotificationUseCase } from '@application/usecases/read-notification-usecase';
import { UnreadNotificationUseCase } from '@application/usecases/unread-notification-usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationUseCase,
    GetRecipientNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}

import { Module } from '@nestjs/common';
import { NotificationsController } from './controller/notifications.controller';
import { SendNotificationUseCase } from '../../application/usecases/send-notification-usecase';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}

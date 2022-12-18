import { NotificationRepository } from '../repository/notification-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '@application/usecases/error/notification-not-found-error';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}

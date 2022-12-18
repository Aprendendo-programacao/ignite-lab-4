import { InMemoryNotificationRepository } from '@test/repository/in-memory-notification-repository';
import { NotificationNotFoundError } from '@application/usecases/error/notification-not-found-error';
import { makeNotification } from '@test/factory/notification-factory';
import { ReadNotificationUseCase } from '@application/usecases/read-notification-usecase';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not br able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    await expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});

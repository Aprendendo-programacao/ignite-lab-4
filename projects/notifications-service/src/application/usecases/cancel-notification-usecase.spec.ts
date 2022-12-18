import { InMemoryNotificationRepository } from '@test/repository/in-memory-notification-repository';
import { CancelNotificationUseCase } from '@application/usecases/cancel-notification-usecase';
import { NotificationNotFoundError } from '@application/usecases/error/notification-not-found-error';
import { makeNotification } from '@test/factory/notification-factory';

describe('Cancel notification', () => {
  it('should be able to Cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not br able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    await expect(() => {
      return cancelNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});

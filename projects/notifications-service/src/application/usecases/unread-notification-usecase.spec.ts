import { InMemoryNotificationRepository } from '@test/repository/in-memory-notification-repository';
import { NotificationNotFoundError } from '@application/usecases/error/notification-not-found-error';
import { makeNotification } from '@test/factory/notification-factory';
import { UnreadNotificationUseCase } from '@application/usecases/unread-notification-usecase';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not br able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationRepository,
    );

    await expect(() => {
      return unreadNotificationUseCase.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});

import { InMemoryNotificationRepository } from '@test/repository/in-memory-notification-repository';
import { CountRecipientNotificationUseCase } from '@application/usecases/count-recipient-notifications-usecase';
import { makeNotification } from '@test/factory/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationUseCase(notificationRepository);

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});

import { InMemoryNotificationRepository } from '@test/repository/in-memory-notification-repository';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factory/notification-factory';
import { GetRecipientNotificationUseCase } from '@application/usecases/get-recipient-notification';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotificationUseCase = new GetRecipientNotificationUseCase(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    console.log(notificationRepository.notifications);

    const { notifications } = await getRecipientNotificationUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});

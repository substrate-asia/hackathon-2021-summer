import { notification } from 'antd';

class NotificationHelper {
  showNoWalletNotification = () => {
    notification.open({
      message: 'No wallet specified',
      description: `Please select a wallet first.`,
      top: 100,
    });
  };
}

export default new NotificationHelper();

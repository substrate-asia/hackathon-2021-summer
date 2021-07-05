import { Modal } from '@redq/reuse-modal';
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import '@redq/reuse-modal/es/index.css';
import 'common/assets/css/flaticon.css';
import 'swiper/swiper-bundle.css';
import '../containers/CryptoModern/CountDown/timer.css';
import 'common/assets/css/icon-example-page.css';
import reduxHelper from '../redux/helper'
import backend from '../common/backend'

export default function CustomApp({ Component, pageProps }) {
  const store = reduxHelper.getStore();

  useEffect(async () => {
    await backend.initialize();
    await reduxHelper.getProjects();
  }, []);

  return (
    <Provider store={store}>
      <Modal>
        <Component {...pageProps} />
      </Modal>
    </Provider>
  );
}

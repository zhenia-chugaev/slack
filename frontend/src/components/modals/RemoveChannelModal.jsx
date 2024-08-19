import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { selectChannelsInfo } from '#store/channelsSlice';
import { RemoveChannelForm } from '#components/forms';

const RemoveChannelModal = ({ closeModal }) => {
  const { channelInProgress } = useSelector(selectChannelsInfo);
  const { t } = useTranslation();

  return (
    <Modal
      enforceFocus={false}
      restoreFocus={false}
      onHide={closeModal}
      centered
      show
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead mb-0">{t('modals.removeChannel.body')}</p>
        <RemoveChannelForm
          channelId={channelInProgress}
          onSuccess={closeModal}
          onReset={closeModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { AddChannelForm } from '#components/forms';

const AddChannelModal = ({ switchChannel, closeModal }) => {
  const { t } = useTranslation();

  const onSuccess = (channel) => {
    switchChannel(channel.id);
    closeModal();
  };

  return (
    <Modal
      enforceFocus={false}
      restoreFocus={false}
      onHide={closeModal}
      centered
      show
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm onSuccess={onSuccess} onReset={closeModal} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

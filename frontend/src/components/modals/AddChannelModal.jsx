import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { AddChannelForm } from '#components/forms';

const AddChannelModal = ({ switchChannel, closeModal }) => {
  const { t } = useTranslation();

  const onSuccess = (channel) => {
    const message = t('modals.addChannel.success');
    toast.success(message);
    switchChannel(channel.id);
    closeModal();
  };

  const onFailure = (error) => {
    const code = error.originalStatus || error.status;
    const message = t([`errors.${code}`, 'errors.default']);
    toast.error(message);
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
        <AddChannelForm
          onReset={closeModal}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

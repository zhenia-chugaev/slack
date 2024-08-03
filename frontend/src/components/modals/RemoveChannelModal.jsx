import Modal from 'react-bootstrap/Modal';
import { RemoveChannelForm } from '#components/forms';

const RemoveChannelModal = ({ channelId, setActiveChannel, closeModal }) => {
  const onSuccess = () => {
    setActiveChannel('');
    closeModal();
  };

  return (
    <Modal onHide={closeModal} centered show>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead mb-0">Уверены?</p>
        <RemoveChannelForm
          channelId={channelId}
          onSuccess={onSuccess}
          onReset={closeModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

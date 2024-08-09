import Modal from 'react-bootstrap/Modal';
import { AddChannelForm } from '#components/forms';

const AddChannelModal = ({ switchChannel, closeModal }) => {
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
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm onSuccess={onSuccess} onReset={closeModal} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

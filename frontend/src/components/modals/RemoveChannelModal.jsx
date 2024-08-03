import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { selectChannelsInfo } from '#store/channelsSlice';
import { RemoveChannelForm } from '#components/forms';

const RemoveChannelModal = ({ switchChannel, closeModal }) => {
  const { channelInProgress } = useSelector(selectChannelsInfo);

  const onSuccess = () => {
    switchChannel('');
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
          channelId={channelInProgress}
          onSuccess={onSuccess}
          onReset={closeModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;

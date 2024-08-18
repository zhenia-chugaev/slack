import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { useGetChannelsQuery } from '#store/apiSlice';
import { selectChannelsInfo } from '#store/channelsSlice';
import { EditChannelForm } from '#components/forms';

const EditChannelModal = ({ closeModal }) => {
  const { channelInProgress } = useSelector(selectChannelsInfo);
  const { data: channels } = useGetChannelsQuery();
  const { t } = useTranslation();

  const channel = useMemo(
    () => channels.find(({ id }) => id === channelInProgress),
    [],
  );

  return (
    <Modal restoreFocus={false} onHide={closeModal} centered show>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.editChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditChannelForm
          channel={channel}
          onSuccess={closeModal}
          onReset={closeModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;

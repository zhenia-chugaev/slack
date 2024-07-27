import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PlusSquare } from 'react-bootstrap-icons';
import { Chat } from '#components';
import { AddChannelForm } from '#components/forms';
import { useGetChannelsQuery } from '#store/apiSlice';

const Main = () => {
  const { data: channels = [], isLoading } = useGetChannelsQuery();
  const [channelsStatus, setChannelsStatus] = useState('idle');
  const [activeChannel, setActiveChannel] = useState();

  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  const openModal = () => {
    setChannelsStatus('addition');
  };

  const closeModal = () => {
    setChannelsStatus('idle');
  };

  const switchChannel = (id) => {
    setActiveChannel(id);
  };

  const shouldChannelBeHighlighted = (channelId, index) => (
    (channelId === activeChannel) || (!activeChannel && index === 0)
  );

  return (
    <div className="h-100 py-4">
      <Tab.Container
        id="channels"
        transition={false}
        activeKey={activeChannel}
        defaultActiveKey={channels[0]?.id}
        unmountOnExit
      >
        <Row className="h-100 shadow">
          <Col as="section" className="h-100 border-end bg-light" lg={2}>
            <div className="d-flex justify-content-between align-items-center py-4 ps-2">
              <h2 className="m-0 fs-6">Каналы</h2>
              <Button className="p-0 lh-1" variant="link" type="button" onClick={openModal}>
                <PlusSquare size={20} />
              </Button>
            </div>
            <Nav as="ul" className="flex-column">
              {channels.map((channel, i) => (
                <Nav.Item as="li" key={channel.id}>
                  <Button
                    className="w-100 text-start rounded-0"
                    variant={shouldChannelBeHighlighted(channel.id, i) ? 'secondary' : null}
                    onClick={() => setActiveChannel(channel.id)}
                  >
                    {`# ${channel.name}`}
                  </Button>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col as="section" className="h-100 px-0 bg-white">
            <Tab.Content className="h-100">
              {channels.map((channel) => (
                <Tab.Pane className="h-100" eventKey={channel.id} key={channel.id}>
                  <Chat channel={channel} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <Modal show={channelsStatus !== 'idle'} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddChannelForm switchChannel={switchChannel} closeModal={closeModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Main;

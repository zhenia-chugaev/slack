import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { PlusSquare } from 'react-bootstrap-icons';
import { Chat } from '#components';
import { AddChannelModal, RemoveChannelModal } from '#components/modals';
import { useGetChannelsQuery } from '#store/apiSlice';

const VoidComponent = () => {};

const modals = {
  addition: AddChannelModal,
  removal: RemoveChannelModal,
  idle: VoidComponent,
};

const Main = () => {
  const { data: channels = [], isLoading } = useGetChannelsQuery();
  const [channelsMode, setChannelsMode] = useState('idle');
  const [activeChannel, setActiveChannel] = useState('');
  const [channelInProgress, setChannelInProgress] = useState('');

  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  const Modal = modals[channelsMode];

  const openModal = (mode, channelId = '') => {
    setChannelsMode(mode);
    setChannelInProgress(channelId);
  };

  const closeModal = () => {
    setChannelsMode('idle');
  };

  const shouldChannelBeHighlighted = (channelId, index) => (
    (channelId === activeChannel) || (!activeChannel && index === 0)
  );

  const defaultChannel = channels[0]?.id;

  return (
    <div className="h-100 py-4">
      <Tab.Container
        id="channels"
        transition={false}
        activeKey={activeChannel || defaultChannel}
        defaultActiveKey={defaultChannel}
        unmountOnExit
      >
        <Row className="h-100 shadow">
          <Col as="section" className="h-100 border-end bg-light" lg={2}>
            <div className="d-flex justify-content-between align-items-center py-4 ps-2">
              <h2 className="m-0 fs-6">Каналы</h2>
              <Button
                className="p-0 lh-1"
                variant="link"
                type="button"
                onClick={() => openModal('addition')}
              >
                <PlusSquare size={20} />
              </Button>
            </div>
            <Nav as="ul" className="flex-column">
              {channels.map((channel, i) => (
                <Nav.Item as="li" key={channel.id}>
                  {channel.removable
                    ? (
                      <Dropdown as={ButtonGroup} className="w-100" align="end">
                        <Button
                          className="w-100 text-start rounded-0"
                          variant={shouldChannelBeHighlighted(channel.id, i) ? 'secondary' : 'light'}
                          onClick={() => setActiveChannel(channel.id)}
                        >
                          {`# ${channel.name}`}
                        </Button>
                        <Dropdown.Toggle
                          id={`${channel.name}-dropdown-toggle`}
                          variant={shouldChannelBeHighlighted(channel.id, i) ? 'secondary' : 'light'}
                          split
                        />
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => openModal('removal', channel.id)}>
                            Удалить
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => openModal('edition')}>
                            Переименовать
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )
                    : (
                      <Button
                        className="w-100 text-start rounded-0"
                        variant={shouldChannelBeHighlighted(channel.id, i) ? 'secondary' : 'light'}
                        onClick={() => setActiveChannel(channel.id)}
                      >
                        {`# ${channel.name}`}
                      </Button>
                    )}
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

      <Modal
        channelId={channelInProgress}
        setActiveChannel={setActiveChannel}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Main;

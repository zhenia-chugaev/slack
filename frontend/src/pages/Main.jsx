import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import { Chat } from '#components';
import { useGetChannelsQuery } from '#store/apiSlice';

const Main = () => {
  const { data: channels = [], isLoading } = useGetChannelsQuery();
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
            <div className="px-2 py-4">
              <h2 className="m-0 fs-6">Каналы</h2>
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
    </div>
  );
};

export default Main;

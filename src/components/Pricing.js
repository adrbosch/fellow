
import React from 'react';

import { CheckCircleTwoTone, QuestionCircleFilled } from '@ant-design/icons';

import { Card, Button, Typography, List, Row, Col, Tooltip } from 'antd';

const { Title } = Typography;

const Items = ({ listItems }) => (
  <List
    style={{ textAlign: 'left' }}
    header={null}
    footer={null}
    dataSource={listItems}
    renderItem={item => (
      <li style={{ marginTop: 8 }}>
        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ margin: 8 }} />
        {item.content}
        {item.tooltip ? (
          <Tooltip title={item.tooltip}>
            <QuestionCircleFilled style={{ margin: 8 }} />
          </Tooltip>
        ) : null}
      </li>
    )}
  />
);

const contact = () => {
  console.log('contact me!');
//   $crisp.push(['do', 'chat:open']);
//   $crisp.push(['do', 'message:send', ['text', "Hi, I'm interested in other plans."]]);
};

const buttonProps = {
  style: { marginBottom: 48 },
  shape: 'round',
  block: 'true',
  size: 'large',
  type: 'primary',
};

const renderButton = (plan) => {
  const { buttonLabel } = plan;
  return (
    <Button {...buttonProps} style={{ background: "var(--primary)", borderColor: "var(--primary)" }}>
      {buttonLabel}
    </Button>
  );
};

// const PricingCards = ({ data, onClick, startTrial }) => {

const PricingCards = ({ data }) => {
  return (
    <Row type="flex" gutter={[24, 8]} justify="center">
      {data.map(plan => {
        const { name, price, priceLabel, description, listItems } = plan;
        return (
          <Col>
            <Card style={{ textAlign: 'center', width: 300 }}>
              <Title level={4}>{name}</Title>
              <p>{description}</p>
              <Title level={2}>{price}</Title>
              <p>{priceLabel}</p>
              {renderButton(plan)}
              <Items listItems={listItems} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default PricingCards;
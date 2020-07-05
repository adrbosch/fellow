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

const numberFormat = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    currencyDisplay: 'symbol',
    useGrouping: 'true',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

const renderButton = (plan, pricing, title, slug) => {
  const { buttonLabel } = plan;
  return (
    <Button {...buttonProps} className="snipcart-add-item" data-item-id={slug} data-item-price={pricing} data-item-url={slug} data-item-name={title} style={{ background: "var(--primary)", borderColor: "var(--primary)" }}>
      {buttonLabel}
    </Button>
  );
};

// const PricingCards = ({ data, onClick, startTrial }) => {

const PricingCards = ({ data, pricing, title, slug }) => {
  return (
    <Row type="flex" gutter={[24, 8]} justify="center">
      {data.map(plan => {
        const { priceLabel, description, listItems } = plan;
        return (
          <Col>
            <Card style={{ textAlign: 'center', width: 300 }}>
              <Title level={4}>{title}</Title>
              <p>{description}</p>
              <Title level={2}>{numberFormat(pricing)}</Title>
              <p>{priceLabel}</p>
              {renderButton(plan, pricing, title, slug)}
              <Items listItems={listItems} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default PricingCards;
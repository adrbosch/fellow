import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'

import { Statistic, Button, Typography } from 'antd'

const { Title } = Typography;

const numberFormat = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    currencyDisplay: 'symbol',
    useGrouping: 'true',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

const SolutionCard = ({
  featuredImage,
  title,
  description,
  price,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
    <Title style={{ textAlign: 'right', marginTop: 16 }} level={4} mark>{numberFormat(price)} / mes</Title>
      {/* <Statistic style={{ textAlign: 'right', marginTop: 16 }} title="$" value={price} precision={0} />
      <Button style={{ marginTop: 16 }} type="primary">
        Recharge
      </Button> */}
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {description && <div className="PostCard--Excerpt">{description}</div>}
    </div>
  </Link>
)

export default SolutionCard

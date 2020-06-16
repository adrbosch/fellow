import React from 'react'

import PostCard from './PostCard'
import './PostSection.css'

class ProductSection extends React.Component {
  static defaultProps = {
    products: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { products, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleProducts = products.slice(0, limit || products.length)

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visibleProducts.length && (
          <div className="PostSection--Grid">
            {visibleProducts.map((product, index) => (
              <PostCard key={product.title + index} {...product} />
            ))}
          </div>
        )}
        {showLoadMore && visibleProducts.length < products.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ProductSection

import React from 'react'

import SolutionCard from './SolutionCard'
import './PostSection.css'

class SolutionSection extends React.Component {
  static defaultProps = {
    solutions: [],
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
    const { solutions, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleSolutions = solutions.slice(0, limit || solutions.length)

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visibleSolutions.length && (
          <div className="PostSection--Grid">
            {visibleSolutions.map((solution, index) => (
              <SolutionCard key={solution.title + index} {...solution} />
            ))}
          </div>
        )}
        {showLoadMore && visibleSolutions.length < solutions.length && (
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

export default SolutionSection

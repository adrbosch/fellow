import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import SolutionSection from '../components/SolutionSection'
import SolutionCategoriesNav from '../components/SolutionCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter solutions by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show scheduled content. See docs
 *
 * @param {solutions} object
 */
export const byDate = solutions => {
  const now = Date.now()
  return solutions.filter(solution => Date.parse(solution.date) <= now)
}

/**
 * filter solutions by category.
 *
 * @param {solutions} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (solutions, title, contentType) => {
  const isCategory = contentType === 'categoriasSoluciones'
  const byCategory = solution =>
    solution.categories &&
    solution.categories.filter(cat => cat.category === title).length
  return isCategory ? solutions.filter(byCategory) : solutions
}

// Export Template for use in CMS preview
export const SolutionIndexTemplate = ({
    title,
    subtitle,
    featuredImage,
    solutions = [],
    solutionCategories = [],
    enableSearch = true,
    contentType
  }) => (
    <Location>
      {({ location }) => {
        let filteredSolutions =
          solutions && !!solutions.length
            ? byCategory(byDate(solutions), title, contentType)
            : []
  
        let queryObj = location.search.replace('?', '')
        queryObj = qs.parse(queryObj)
  
        if (enableSearch && queryObj.s) {
          const searchTerm = queryObj.s.toLowerCase()
          filteredSolutions = filteredSolutions.filter(solution =>
            solution.frontmatter.title.toLowerCase().includes(searchTerm)
          )
        }
  
        return (
          <main className="Solutions">
            <PageHeader
              title={title}
              subtitle={subtitle}
              backgroundImage={featuredImage}
            />
  
            {!!solutionCategories.length && (
              <section className="section thin">
                <div className="container">
                  <SolutionCategoriesNav enableSearch categories={solutionCategories} />
                </div>
              </section>
            )}
  
            {!!solutions.length && (
              <section className="section">
                <div className="container">
                  <SolutionSection solutions={filteredSolutions} />
                </div>
              </section>
            )}
          </main>
        )
      }}
    </Location>
  )
  
  // Export Default ProductIndex for front-end
  const SolutionIndex = ({ data: { page, solutions, solutionCategories } }) => (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <SolutionIndexTemplate
        {...page}
        {...page.fields}
        {...page.frontmatter}
        solutions={solutions.edges.map(solution => ({
          ...solution.node,
          ...solution.node.frontmatter,
          ...solution.node.fields
        }))}
        solutionCategories={solutionCategories.edges.map(solution => ({
          ...solution.node,
          ...solution.node.frontmatter,
          ...solution.node.fields
        }))}
      />
    </Layout>
  )
  
  export default SolutionIndex


export const pageQuery = graphql`
  ## Query for SolutionIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SolutionIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        description
        template
        subtitle
        featuredImage
      }
    }

    solutions: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "soluciones" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            price
            description
            basePricingData {
              price
              priceLabel
            }
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    solutionCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "categoriasSoluciones" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import ProductSection from '../components/ProductSection'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter products by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show scheduled content. See docs
 *
 * @param {products} object
 */
export const byDate = products => {
  const now = Date.now()
  return products.filter(product => Date.parse(product.date) <= now)
}

/**
 * filter products by category.
 *
 * @param {products} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (products, title, contentType) => {
  const isCategory = contentType === 'productCategories'
  const byCategory = product =>
    product.categories &&
    product.categories.filter(cat => cat.category === title).length
  return isCategory ? products.filter(byCategory) : products
}

// Export Template for use in CMS preview
export const ProductIndexTemplate = ({
    title,
    subtitle,
    featuredImage,
    products = [],
    productCategories = [],
    enableSearch = true,
    contentType
  }) => (
    <Location>
      {({ location }) => {
        let filteredProducts =
          products && !!products.length
            ? byCategory(byDate(products), title, contentType)
            : []
  
        let queryObj = location.search.replace('?', '')
        queryObj = qs.parse(queryObj)
  
        if (enableSearch && queryObj.s) {
          const searchTerm = queryObj.s.toLowerCase()
          filteredProducts = filteredProducts.filter(product =>
            product.frontmatter.title.toLowerCase().includes(searchTerm)
          )
        }
  
        return (
          <main className="Products">
            <PageHeader
              title={title}
              subtitle={subtitle}
              backgroundImage={featuredImage}
            />
  
            {!!productCategories.length && (
              <section className="section thin">
                <div className="container">
                  <PostCategoriesNav enableSearch categories={productCategories} />
                </div>
              </section>
            )}
  
            {!!products.length && (
              <section className="section">
                <div className="container">
                  <ProductSection products={filteredProducts} />
                </div>
              </section>
            )}
          </main>
        )
      }}
    </Location>
  )
  
  // Export Default ProductIndex for front-end
  const ProductIndex = ({ data: { page, products, productCategories } }) => (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <ProductIndexTemplate
        {...page}
        {...page.fields}
        {...page.frontmatter}
        products={products.edges.map(product => ({
          ...product.node,
          ...product.node.frontmatter,
          ...product.node.fields
        }))}
        productCategories={productCategories.edges.map(product => ({
          ...product.node,
          ...product.node.frontmatter,
          ...product.node.fields
        }))}
      />
    </Layout>
  )
  
  export default ProductIndex


export const pageQuery = graphql`
  ## Query for ProductIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ProductIndex($id: String!) {
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

    products: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "products" } } }
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
            categories {
              category
            }
            image
          }
        }
      }
    }
    productCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "productCategories" } } }
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
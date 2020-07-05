import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'

import PageHeader from '../components/PageHeader'
import BackgroundVideo from '../components/BackgroundVideo'
import Gallery from '../components/Gallery'
import Popup from '../components/Popup'
import Accordion from '../components/Accordion'

//Pricing Cards
import { Typography, List } from 'antd'
import PricingCards from '../components/Pricing'
import DefaultButton from '../components/DefaultButton'

const { Title } = Typography;

export const SingleSolutionTemplate = ({
  title,
  date,
  body,
  price,
  snipdata,
  slug,
  featuredImage,
  accordion,
  basePricingData,
  gallery,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="https://schema.org/ItemPage"
    >
      <div className="container skinny">
        <Link className="SinglePost--BackButton" to="/solutions/">
          <ChevronLeft /> Atrás
        </Link>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
          <DefaultButton>{snipdata={slug, price, title}}</DefaultButton>
          </div>
          {title && (
            <Title style={{ textAlign: 'center'}} level={2}>{title}</Title>
          )
          }
          <div className="SinglePost--InnerContent" style={{fontSize: 15}}>
            <br></br>
            <Content source={body} />
          </div>
          <section className="section">
          <div className="container">
          <Title level={3}>Galería:</Title>
             <PageHeader
                  large
                  backgroundImage={featuredImage}
            />
            <h2></h2>
            <Gallery images={gallery} />
          </div>
          </section>

          <section className="section">
            <div className="container">
              <Accordion items={accordion} />
            </div>
          </section>

          <section className="section">
            <div className="container">
            <PricingCards
              title={title}
              pricing={price}
              data={basePricingData}
              slug={slug}>
            </PricingCards>
            </div>
          </section>

          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                Otra solución
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                Otra solución
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SingleSolution for front-end
const SingleSolution = ({ data: { solution, allSolutions } }) => {
  const thisEdge = allSolutions.edges.find(edge => edge.node.id === solution.id)
  return (
    <Layout
      meta={solution.frontmatter.meta || false}
      title={solution.frontmatter.title || false}
    >
      <SingleSolutionTemplate
        {...solution}
        {...solution.frontmatter}
        slug={solution.fields.slug}
        body={solution.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleSolution

export const pageQuery = graphql`
  ## Query for SingleSolution data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleSolution($id: String!) {
    solution: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage
        price
        template
        subtitle
        accordion {
          title
          description
        }
        basePricingData {
          description
          priceLabel
          type
          buttonLabel
          listItems {
            content
            tooltip
          }
        }
        gallery {
          alt
          image
          title
        }
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
      }
    }

    allSolutions: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "soluciones" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
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

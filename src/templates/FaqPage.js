import React from 'react'
import { graphql } from 'gatsby'

//pricing cards CSS
import 'antd/dist/antd.css'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Accordion from '../components/Accordion'
import Popup from '../components/Popup'

// Export Template for use in CMS preview
export const FaqPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  accordion,
  body,
  button
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    
    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Accordion items={accordion} />
      </div>
    </section>

  </main>
)

const FaqPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <FaqPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default FaqPage

export const pageQuery = graphql`
  query FaqPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        accordion {
          title
          description
        }
      }
    }
  }
`

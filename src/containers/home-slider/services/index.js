import React from 'react';
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from "gatsby"
import SectionTitle from '../../../components/shared/section-title'
import Blog from '../../../components/blog/layout-one'
import {ServicesSectionWrap, ServicesInner} from './services.stc'

const ServicesSection = ({section}) => {
    const blogQueryData = useStaticQuery(graphql `
        query sliderHomeBlogDataQueryAndSliderHomeBlogDataQuery {
            homesliderdataJson(id: {eq: "slider_recent_post_section_content"}) {
                title
                subtitle
            }
            allMarkdownRemark(filter: {frontmatter: {is_featured: {ne: true}}}, limit: 4, sort: {order: DESC, fields: frontmatter___date}) {
                edges {
                  node {
                    fields {
                        slug
                    }                      
                    frontmatter {
                      title
                      id
                      date(formatString: "MMM Do, YYYY")
                      author
                      shortDesc
                      image {
                        childImageSharp {
                          fluid(maxWidth: 600, maxHeight: 630, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                            presentationWidth
                            presentationHeight
                          }
                        }
                      }
                    }
                  }
                }
            }
        }
    `);
    const blogSecData = blogQueryData.homesliderdataJson;
    const blogs = blogQueryData.allMarkdownRemark.edges;
    return (
        <ServicesSectionWrap {...section}>
            <div className="col-1 offset-1">
                <SectionTitle
                    title={blogSecData.title}
                    subtitle={blogSecData.subtitle}
                />
            </div>
            <ServicesInner className="col-4 offset-1">
                <div className="row">
                    {blogs.map((blog, i) => (
                        <div className="col-2" key={`${blog.node.fields.slug}-${i}`}>
                            <Blog
                                title={blog.node.frontmatter.title}
                                // date={blog.node.frontmatter.date}
                                // author={blog.node.frontmatter.author}
                                id={blog.node.frontmatter.id}
                                path={blog.node.fields.slug}
                                excerpt={blog.node.frontmatter.shortDesc}
                                // image={blog.node.frontmatter.image.childImageSharp.fluid}
                            />
                        </div>
                    ))}
                </div>
            </ServicesInner>
        </ServicesSectionWrap>
    ) 
}

ServicesSection.propTypes = {
    section: PropTypes.object
}

ServicesSection.defaultProps = {
    section: {
        backgroundColor: '#f8f8f8'
    },
}

export default ServicesSection;
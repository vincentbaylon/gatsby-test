import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Image from '../components/image'

const components = {
  Image: Image
}

function ucwords(text) {
  let str = text.toLowerCase();
  return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    function (s) {
      return s.toUpperCase();
    }
  )
}

const blogPostTemplate = (data) => {
  const elementorData = JSON.parse(data.pageContext.elementorData);
  
  console.log({ elementorData })

  const Page = elementorData.map(row => {
    console.log({ row });

    return (
      <div key={row.id} className="row">
        {
          row.elements.map(column => {
            console.log({ column });

            return (
              <div key={column.id} className={`col-${column.settings._column_size}`}>
                {
                  column.elements.map(widget => {
                    return (
                      React.createElement(
                        components[ucwords(widget.widgetType)],
                        {
                          ...widget.settings,
                          key: widget.id
                        }
                      )
                    )
                  })
                }
                </div>
            )
          })
        }
      </div>
    )
  })

  console.log({ Page })

  return (
    <Layout>
      <Seo title="Home" />
      {Page}

    </Layout>
  )
}

export default blogPostTemplate

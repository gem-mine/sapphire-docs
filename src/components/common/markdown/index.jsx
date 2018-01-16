import React from 'react'

export default props => {
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: props.source }} />
}

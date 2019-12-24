import React from 'react'
import StyledLink from './StyledLink'
import TopicImage from './TopicImage'

class IconListItem extends React.PureComponent {

  render() {
    const {index, title, image, link, color, size } = this.props;
    let content = '';

    content = ( 
      <StyledLink to={link}>
        <TopicImage title={title} fill={color} width="80" height="80" />
        <div>{title}</div>
      </StyledLink>
    )

    return (
      <li key={index}>{content}</li>
    )
  }
}

export default IconListItem

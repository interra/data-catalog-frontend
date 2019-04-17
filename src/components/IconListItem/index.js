import React from 'react'
import StyledLink from './StyledLink'
import TopicImage from './TopicImage'

class IconListItem extends React.PureComponent {

  render() {
    const { item } = this.props;
    const color = '#0A77BD';
    let content = '';

    if (item.icon && item.none) {
      // Image provided as a url.
      content = (
        <StyledLink href={item.ref}>
          <img src={item.icon} alt={item.title} />
          <div>{item.title}</div>
        </StyledLink>
      )
    }
    else {
      // Image provided by custom component.
      content = ( 
        <StyledLink href={item.ref}>
          <TopicImage title={item.title} fill={color} width="80" height="80" />
          <div>{item.title}</div>
        </StyledLink>
      )
    };

    return (
      <li key={item.identifier}>{content}</li>
    )
  }
}

export default IconListItem

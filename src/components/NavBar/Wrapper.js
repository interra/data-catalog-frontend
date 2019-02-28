import styled from "styled-components";

export default styled.div`
  background-color: ${props => props.theme.navBarBackgroundColor};
  background-image: none;
  position: relative;
  display: block;
  clear: both;
  z-index: 1;
  .navbar {
    padding: 0 15px;
  }
  .dropdown-toggle::after {
    margin-left: .4em;
    margin-top: .8rem;
  }
  .navbar-toggler {
    margin: 5px;
  }
  li.nav-item a {
    display: inline-flex;
    padding: 0.9em 1.2em;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    outline: 0;
    font-weight: 500;
    color: ${props => props.theme.navBarLink};
    transition: all 0.2s linear;

    &:hover {
      color: ${props => props.theme.navBarLink};
      text-decoration: none;
      background-color: ${props => props.theme.navBarLinkHoverBack};
    }
    &.active {
      background-color: none !important;
      box-shadow: inset 0 -4px 0 ${props => props.theme.navBarLinkActiveHoverBack};
      text-decoration: none;
      color: ${props => props.theme.navBarLink};
    }
    &:hover.active,
    &:focus.active {
      background-color: none !important;
      box-shadow: inset 0 -4px 0 ${props => props.theme.navBarLinkActiveHoverBack};
      color: ${props => props.theme.navBarLink};
    }
  }

  @media screen and (max-width: 768px) {
    .navbar-nav .nav-link {
      padding-right: 10px;
      padding-left: 10px;
      display: block;
    }
  }
`;

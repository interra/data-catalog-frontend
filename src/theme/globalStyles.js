import { createGlobalStyle } from "styled-components";
import { css } from 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-line no-unused-vars
import defaultTheme from "./default";

const GlobalStyles = createGlobalStyle`
  @import url('//fonts.googleapis.com/css?family=Rubik:300,500,700&amp;subset=latin');
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  html {
    /*Convert font size to base 10 for easier calculations (1rem = 10px)*/
    font-size: 62.5%;
  }
  body .App {
    font-family: 'Rubik', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    font-size: 1.6rem;

    background-color: ${defaultTheme.backgroundColor};
    color: ${defaultTheme.textColor};

    a, input, button, textarea {
      transition: all 0.2s linear;
    }
    a {
      color: ${defaultTheme.linkColor};
      &:hover {
        color: ${defaultTheme.linkHoverColor};
      }
    }
    h1,h2,h3,h4,h5 { color: ${defaultTheme.headingColor}; }
    h1 { font-size: 3.0rem }  // 30px
    h2 { font-size: 2.4rem; } // 24px
    h3 { font-size: 2.0rem; } // 20px

    .container-fluid {
      padding-left: 25px;
      padding-right: 25px;
    }
    .form-control {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
    .theme-wrapper {
      border-bottom: 1px solid #dddddd;
      padding: 5px 0;
      margin-bottom: 10px;
      display: flex;
      .theme {
        color: #A7AAAC;
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 400;
        text-transform: uppercase;
      }
    }
  }
`;
export default GlobalStyles;

import { createGlobalStyle } from "styled-components";
import defaultTheme from "./default";

const GlobalStyles = createGlobalStyle`
  @import url('http://fonts.googleapis.com/css?family=Rubik:300,500,700&amp;subset=latin');
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  body {
    background-color: ${defaultTheme.backgroundColor};
    color: ${defaultTheme.textColor};
    font-weight: 300;
    font-family: 'Rubik', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    a, input, button, textarea {
      transition: all 0.2s linear;
    }
    h1,h2,h3,h4,h5 { color: ${defaultTheme.headingColor}; }
    h2 { font-size: 1.5rem; } //24px
    h3 { font-size: 1.25rem; } // 20px

    .container-fluid {
      padding-left: 25px;
      padding-right: 25px;
    }

  }
`;
export default GlobalStyles;

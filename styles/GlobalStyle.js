import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* @import url('https://use.typekit.net/ccq8qac.css'); */

  html, body, #screen {
    min-height: 100%;
  }

  html {
    box-sizing: border-box;
    /* Set font-size to 10px to make rem math easier
      ie. 1.6rem == 16px */
    font-size: 10px;  
    width: 100%;
    overflow-x: hidden;
  }

  *, *::before, *::after {
      box-sizing: inherit;
  }

  body {
    background: white;
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.fontFamily};
    font-size: 1.6rem;
    color: ${props => props.theme.black};

  }

  a {
    color: ${props => props.theme.blue};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;

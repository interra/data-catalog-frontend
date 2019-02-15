import styled from "styled-components";

const Wrapper = styled.div`
  .logo {
    display: inline-block;
    vertical-align: bottom;
    padding: 20px 0px;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    .logo,
    .site-name {
      display: block;
    }
    a, img {
      max-width: 100%;
    }
  }
`;

export default Wrapper;

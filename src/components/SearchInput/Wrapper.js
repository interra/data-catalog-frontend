import styled from "styled-components";

export default styled.form`
  position: absolute;
  top: 25px;
  right: 25px;
  width: 172px;
  input.form-control {
    position: relative;
    padding: 0 30px 0 12px;
    width: 170px;
    height: 36px;
    margin: 0;
    background-color: #fff;
    border-radius: 100px;
    border-color: ${props => props.theme.grayLight};
    font-size: 1.6rem;
    font-weight: 300;
  }
  button[type="submit"] {
    background: none !important;
    border: none;
    color: #555555;
    display: inline-block;
    height: 30px;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 10px;
    width: 25px;
    top: 2px;
    &:before {
      content: "\f002";
      font-family: "FontAwesome";
      font-size: 1.8rem;
      color: ${props => props.theme.gray}
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    input.form-control {
      width: 100%;
    }
  }
`;

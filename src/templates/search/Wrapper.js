import styled from 'styled-components';

const Wrapper = styled.div`

  .search-sidebar-options {
    background-color: #FFFFFF;
    border: 1px solid ${props => props.theme.borderColor};
    padding: 30px;
    margin-bottom: 25px;
  }

  .search-sidebar-label {
    margin-top: 0;
    margin-bottom: 20px;
  }

  .pagination {
    li a,
    li span {
      border: 1px solid ${props => props.theme.borderColor};
    }

    li.active > a,
    li.active > a:focus {
      background-color: ${props => props.theme.highlight};
      border-color: ${props => props.theme.borderColor};
    }
  }

  .results-message {
    margin: 1.6rem 0;
  }

  .results-list,
  .search-sidebar {
    padding-top: 20px !important;
  }
`;

export default Wrapper;

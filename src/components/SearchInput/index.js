import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Wrapper from './Wrapper';

export default class SearchInput extends React.Component {

  render() {
    return (
      <Wrapper id="header-search-form" role="search">
        <FormGroup>
          <Label for="search" className="sr-only" >Search</Label>
          <Input type="text" name="search" id="search" className="form-control form-text compact-form-input" placeholder="Search" size="30" maxLength="128" />
          <Button type="submit" id="submit" name="op" value="\f002" className="form-submit btn btn-default btn-primary compact-form-input"/>
        </FormGroup>
      </Wrapper>
    );
  }
}

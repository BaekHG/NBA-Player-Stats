import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search';
const useStyles = makeStyles({
  dd: {
    width: '200px',
  },
});
const Navbar = () => {
  const classes = useStyles();

  return (
    <Container>
      <SearchContainer>
        <Search className={classes.dd} />
      </SearchContainer>
    </Container>
  );
};

export default Navbar;

const SearchContainer = styled.div`
  width: 40px;
`;
const Container = styled.div`
  width: 100%;
  border-bottom-style: solid;
  background-color: #212121;
  border-width: 1;
  border-bottom-color: #888888;
  position: fixed;
  top: 0;
  z-index: 100;
`;

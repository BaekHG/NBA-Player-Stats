import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../components/Search';
import ShowDetail from '../components/ShowDetail';
import { connect } from 'react-redux';
const Home = ({ PlayerInfo }) => {
  return (
    <Container>{PlayerInfo.length > 0 ? <ShowDetail /> : <Search />}</Container>
  );
};

const mapPropsToState = (state, ownProps) => {
  return { PlayerInfo: state };
};
export default connect(mapPropsToState, null)(Home);
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

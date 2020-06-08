import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../components/Search';
import ShowDetail from '../components/ShowDetail';
import { connect } from 'react-redux';
const Home = ({ PlayerInfo }) => {
  console.log(PlayerInfo);
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://ffwallpaper.com/wallup/nba/nba-3.jpg');
`;

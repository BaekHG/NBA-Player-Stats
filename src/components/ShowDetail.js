import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PlayerInfo from './PlayerInfo';
import SeasonAverage from './SeasonAverage';
import Navbar from './Navbar';
const ShowDetail = ({ info }) => {
  return (
    <Container>
      <div>
        <Navbar />
        {/* <PlayerInfo /> */}
        <SeasonAverage />
      </div>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    info: state,
  };
};
export default connect(mapStateToProps)(ShowDetail);

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 150px;
`;

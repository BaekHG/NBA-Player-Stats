import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Divider from './Divider';
import SeasonAverage from './SeasonAverage';
import Navbar from './Navbar';
import CurrentGameLog from './CurrentGameLog';
import Chart from './Chart';
const ShowDetail = ({ info }) => {
  return (
    <Container>
      <div>
        <Navbar />
        <SeasonAverage />
        <Divider />
        <Chart />
        <Divider />
        <CurrentGameLog />
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
  margin-top: 300px;
`;

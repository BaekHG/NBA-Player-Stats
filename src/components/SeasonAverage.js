import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AvgTable from './AvgTable';
import styled from 'styled-components';
import { colors } from './theme';
// import { queryString } from './utils';

const fontFamily = '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"';
const SeasonAverage = ({ info }) => {
  const {
    player: { playerInfo },
  } = info[0];
  const {
    player: { playerAvg },
  } = info[0];

  const renderAvgStat = () => (
    <div>
      {info.map((player, index) => {
        const color = colors[index % colors.length];
        return (
          <PlayerAvgContainer>
            <div style={{ paddingBottom: '5px' }}>
              <h5
                style={{
                  color,
                  fontFamily: fontFamily,
                  fontSize: '24px',
                  fontWeight: '400',
                  lineHeight: '1.33',
                }}
              >
                {player.player.playerInfo.first_name}{' '}
                {player.player.playerInfo.last_name}
              </h5>
              <h6
                style={{
                  color,
                  fontFamily: fontFamily,
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '1.33',
                }}
              >
                Position: {player.player.playerInfo.position} | Team:{' '}
                {player.player.playerInfo.team.abbreviation}
              </h6>
            </div>
            <AvgTable playerAvg={player.player.playerAvg} />
          </PlayerAvgContainer>
        );
      })}
    </div>
  );
  console.log(playerInfo, playerAvg);
  return (
    <>
      <H2>'18 - '19 SEASON AVERAGES</H2>
      <Container>{renderAvgStat()}</Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return { info: state };
};
export default connect(mapStateToProps)(SeasonAverage);

const PlayerAvgContainer = styled.div`
  padding: 15px 0px;
`;
const H2 = styled.h2`
  color: #e5e8e9;
  text-align: center;
  font-family: fontFamily;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

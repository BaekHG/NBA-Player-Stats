import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AvgTable from './AvgTable';
import styled from 'styled-components';
import { colors } from './theme';
import PlayerInfo from './PlayerInfo';
import Modal from '@material-ui/core/Modal';
const SeasonAverage = ({ info }) => {
  console.log('test123');
  const [open, setOpen] = useState({
    isOpen: false,
    i: 1,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const renderModal = (e) => {
    const i = e.target.value;
    setOpen({ isOpen: true, i });
  };
  const renderAvgStat = () => (
    <div>
      {info.map((player, index) => {
        const color = colors[index % colors.length];
        return (
          <PlayerAvgContainer>
            <div style={{ paddingBottom: '5px' }}>
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color,
                  fontSize: '27px',
                  fontWeight: '200',
                  lineHeight: '1.33',
                }}
                value={index}
                onClick={renderModal}
              >
                {player.player.playerInfo.first_name}{' '}
                {player.player.playerInfo.last_name}
              </button>

              <h6
                style={{
                  color,
                  fontSize: '17px',
                  fontWeight: '150',
                  lineHeight: '1.33',
                }}
              >
                Position: {player.player.playerInfo.position} | Team:{' '}
                {player.player.playerInfo.team.abbreviation}
              </h6>
            </div>
            <Modal open={open.isOpen} onClose={handleClose}>
              <>
                <PlayerInfo key={index} index={open.i} player={info} />
              </>
            </Modal>
            <AvgTable key={index} playerAvg={player.player.playerAvg} />
          </PlayerAvgContainer>
        );
      })}
    </div>
  );
  return (
    <AvgConatiner>
      <H2>'18 - '19 SEASON AVERAGES</H2>
      <PlayerAvgContainer>{renderAvgStat()}</PlayerAvgContainer>
    </AvgConatiner>
  );
};

const mapStateToProps = (state) => {
  return { info: state };
};
export default connect(mapStateToProps)(SeasonAverage);

const AvgConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerAvgContainer = styled.div`
  padding: 15px 50px;
  width: 100%;
`;
const H2 = styled.h2`
  color: #e5e8e9;
  font-family: '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"';
  font-weight: 400;
  font-size: 37px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

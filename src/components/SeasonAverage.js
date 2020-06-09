import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import AvgTable from './AvgTable';
// import Typography from '@material-ui/core/Typography';
// import { PLAYER_STATS_COLS } from './utils';
// import { colors } from './theme';
// import { queryString } from './utils';

const SeasonAverage = ({ info }) => {
  const {
    player: { playerInfo },
  } = info[0];
  const {
    player: { playerAvg },
  } = info[0];

  const renderStatline = (playerId, color) => {
    const { stats } = this.state;
    const { classes } = this.props;

    const playerStats = stats[playerId];
    if (!playerStats) {
      return null;
    }
  };
  const renderAvgStat = () => (
    <div>
      {info
        .map(
          (playerId, index) => console.log(playerId)
          //   this.renderStatline(playerId, colors[index % colors.length])
        )
        .filter((e) => !!e)}
    </div>
  );
  console.log(playerInfo, playerAvg);
  return (
    <div>
      <h1>'18 - '19 SEASON AVERAGES</h1>
      {renderAvgStat()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { info: state };
};
export default connect(mapStateToProps)(SeasonAverage);

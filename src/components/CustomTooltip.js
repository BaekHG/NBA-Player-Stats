import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import styled from 'styled-components';
const styles = (theme) => ({
  container: {
    background: '#212121',
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
  },
  player: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

const CustomTooltip = (props) => {
  const { payload } = props;

  if (!payload || payload.length === 0) {
    return null;
  }
  const renderPlayer = (playerData) => {
    const {
      color,
      name,
      value,
      dataKey,
      payload: {
        game: { date },
      },
    } = playerData;

    return (
      <PlayerContainer key={name}>
        <Typography variant="body1" style={{ color }}>
          {name}: {value}
        </Typography>
        <Typography variant="subtitle2" style={{ color }}>
          {moment(date).format('MM-DD-YYYY')}
        </Typography>
      </PlayerContainer>
    );
  };

  //   const data = payload[0].payload;
  return <Container>{payload.map((p) => renderPlayer(p))}</Container>;
};

const PlayerContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;
const Container = styled.div`
  background-color: #212121;
  padding: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: white;
`;

export default withStyles(styles)(CustomTooltip);

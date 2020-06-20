import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { colors } from './theme';
import InputBase from '@material-ui/core/InputBase';
import { CHART_STATS_COLS, CHART_STATS_VALUE } from './utils';
import CustomTooltip from './CustomTooltip';
const OutlinedInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#212121',
    border: '1px solid gray',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    '&:hover': {
      borderColor: 'white',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const Chart = ({ player }) => {
  const [filter, setFilter] = useState('pts');

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <LegendContainer>
        {payload.map((p, index) => (
          <legendItemContainer key={index}>
            <div
              style={{
                height: 7,
                width: 7,
                backgroundColor: p.color,
                marginRight: 5,
              }}
            />
            <Typography variant="body1" style={{ color: p.color }}>
              {p.value}
            </Typography>
          </legendItemContainer>
        ))}
      </LegendContainer>
    );
  };
  const handleChange = (e) => {
    // console.log(e.target.value);
    setFilter(e.target.value);
  };
  return (
    <Container>
      <HeaderContainer>
        <h1
          style={{
            color: '#e5e8e9',
            fontFamily:
              '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"',
            fontWeight: 400,
            fontSize: '37px',
          }}
        >
          LAST TEN CHARTS
        </h1>
        <FormControl variant="outlined" style={{ paddingLeft: '10px' }}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={filter}
            onChange={handleChange}
            input={<OutlinedInput labelWidth={2} notched={false} />}
            style={{ color: 'white', backgroundColor: '#212121' }}
          >
            {CHART_STATS_COLS.map((col, index) => (
              <MenuItem value={CHART_STATS_VALUE[index]}>{col}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </HeaderContainer>
      <ResponsiveContainer height={400} width="60%">
        <LineChart>
          {/* hover했을때 나오는 창 */}
          <Tooltip content={<CustomTooltip />} />
          <XAxis
            tick={{ fill: 'transparent' }}
            dataKey="index"
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis tick={{ fill: 'white' }} />

          {/* Legend : 밑에 도움말 */}
          <Legend content={renderLegend} />
          {player
            .map((player, index) => {
              const color = colors[index % colors.length];

              return (
                <Line
                  key={player.player.playerInfo.id}
                  type="monotoneX"
                  data={player.player.currentTen}
                  name={`${player.player.playerInfo.first_name} ${player.player.playerInfo.last_name}`}
                  dataKey={`${filter}`}
                  stroke={color}
                  dot={{ stroke: color, fill: color }}
                />
              );
            })
            .filter((bar) => !!bar)}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const LegendContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const legendItemContainer = styled.div`
  display: flex;
  align-items: center;
`;
const mapStateToProps = (state) => {
  return { player: state };
};
export default connect(mapStateToProps, null)(Chart);

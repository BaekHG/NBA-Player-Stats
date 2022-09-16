import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search';
import Chip from '@material-ui/core/Chip';
import Cancel from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import { colors } from './theme';
import Avatar from '@material-ui/core/Avatar';
import { deletePlayer, deleteAllPlayer } from '../store';
const Navbar = ({ playerInfo, DeletePlayer, DeleteAllPlayer }) => {
  const onPlayerRemoved = (id) => {
    DeletePlayer(id);
  };

  const onAllPlayersRemoved = () => {
    DeleteAllPlayer();
  };
  const renderChips = (playerInfo) => {
    return playerInfo
      .map((p, index) => {
        const color = colors[index % colors.length];
        return (
          <Chip
            key={index}
            style={{ color: color, borderColor: color, margin: 10 }}
            label={`${p.player.playerInfo.first_name} ${p.player.playerInfo.last_name}`}
            clickable
            onDelete={() => onPlayerRemoved(p.player.playerInfo.id)}
            avatar={
              <Avatar
                alt="Natacha"
                src={`https://nba-players.herokuapp.com/players/${p.player.playerInfo.last_name}/${p.player.playerInfo.first_name}`}
              />
            }
            variant="outlined"
            deleteIcon={<Cancel style={{ color }} />}
          />
        );
      })
      .concat(
        <Chip
          key="removeAllPlayer"
          style={{ color: 'red', borderColor: 'red', margin: 10 }}
          // className={`${classes.chip} ${classes.removeAllChip}`}
          label="Clear All"
          clickable
          onClick={() => onAllPlayersRemoved()}
          variant="outlined"
        />
      );
  };
  
  return (
    <Container>
      <ContentContainer>
        <SearchContainer>
          <Search />
        </SearchContainer>
        {renderChips(playerInfo)}
      </ContentContainer>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { playerInfo: state };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    DeletePlayer: (id) => dispatch(deletePlayer(parseInt(id))),
    DeleteAllPlayer: () => dispatch(deleteAllPlayer()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
const Container = styled.div`
  width: 100%;
  border-bottom-style: solid;
  background-color: #212121;
  border-width: 1;
  border-bottom-color: #616161;
  position: fixed;
  top: 0;
  z-index: 100;
`;
const ContentContainer = styled.div`
  background-color: none;
  padding: 10px;
  display: flex;
  align-items: center;
`;
const SearchContainer = styled.div`
  width: 400px;

  margin-right: 20px;
`;

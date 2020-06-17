import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
const fontFamily = '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"';
const PlayerInfo = ({ index, player }) => {
  const listStyle = {
    textAlign: 'center',
    color: '#E2E5E7',
    backgroundColor: '#212121',
    fontFamily,
  };
  const playerInfo = player[index].player.playerInfo;

  return (
    <CardContainer>
      <Card
        style={{
          position: 'absolute',
          WebkitTransform: 'translate(-50%,-50%)',
          transform: 'translate(-50%,-50%)',
          top: '50%',
          left: '50%',
          width: '400',
          color: '#3d4649',
          backgroundColor: '#212121',
          borderRadius: '10px',
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        }}
      >
        <Card.Img
          variant="top"
          src={`https://nba-players.herokuapp.com/players/${playerInfo.last_name}/${playerInfo.first_name}`}
        />
        <Card.Body>
          <Card.Title
            style={{
              fontFamily,
              fontSize: '1.5rem',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {playerInfo.first_name} {playerInfo.last_name}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem style={listStyle}>
            Team : {playerInfo.team.full_name}
          </ListGroupItem>
          <ListGroupItem style={listStyle}>
            Position : {playerInfo.position}
          </ListGroupItem>
          <ListGroupItem style={listStyle}>
            Height : {playerInfo.height_feet}(ft)
          </ListGroupItem>
          <ListGroupItem style={listStyle}>
            Weight : {playerInfo.weight_pounds}(lb)
          </ListGroupItem>
        </ListGroup>
      </Card>
    </CardContainer>
  );
};

export default PlayerInfo;

const Img = styled.img`
  width: 250px;
  height: auto;
`;

const CardContainer = styled.div`
  /* height: 100%; */
  /* width: 500px; */
  /* top: 50;
  left: 50; */
`;

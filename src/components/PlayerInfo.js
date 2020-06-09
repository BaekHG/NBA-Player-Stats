import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
const PlayerInfo = ({ info }) => {
  const listStyle = {
    textAlign: 'center',
    color: '#E2E5E7',
    backgroundColor: '#212121',
    fontFamily: '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"',
  };
  return (
    <Container>
      {info.map((p) => (
        <CardContainer>
          <Card
            style={{
              width: '18rem',
              color: '#E2E5E7',
              backgroundColor: '#212121',
              borderRadius: '10px',
              boxShadow:
                '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
            }}
          >
            <Card.Img
              variant="top"
              src={`https://nba-players.herokuapp.com/players/${p.player.last_name}/${p.player.first_name}`}
            />
            <Card.Body>
              <Card.Title
                style={{
                  fontFamily:
                    '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                }}
              >
                {p.player.first_name} {p.player.last_name}
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem style={listStyle}>
                Team : {p.player.team.full_name}
              </ListGroupItem>
              <ListGroupItem style={listStyle}>
                Position : {p.player.position}
              </ListGroupItem>
              <ListGroupItem style={listStyle}>
                Height : {p.player.height_feet}(ft)
              </ListGroupItem>
              <ListGroupItem style={listStyle}>
                Weight : {p.player.weight_pounds}(lb)
              </ListGroupItem>
            </ListGroup>
          </Card>
        </CardContainer>
      ))}
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return { info: state };
};
export default connect(mapStateToProps)(PlayerInfo);

const Img = styled.img`
  width: 250px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CardContainer = styled.div`
  height: 100%;
  width: 500px;
`;

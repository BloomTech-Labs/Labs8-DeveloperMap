import React from 'react';
import Heart from '../../images/favorites-icon.png';
import styled from 'styled-components';

function Favorite(props) {
  return (
    <FavoriteCard onClick={() => props.history.push(props.companyUrl)}>
      <div>
        <h2>{props.favorite.companyName}</h2>
        <h3>{props.favorite.date}</h3>
        <h4>{props.favorite.jobLink}</h4>
        <h4>{props.favorite.jobTitle}</h4>
        {props.favorite.location && (
          <h4>{`${props.favorite.location.city}, ${
            props.favorite.location.state
          } ${props.favorite.location.zip}`}</h4>
        )}
      </div>
      <div>
        <img alt="hollow heart" src={Heart} style={{ width: '50px' }} />
      </div>
    </FavoriteCard>
  );
}

const FavoriteCard = styled.div`
  border: 1px solid black;
  width: 300px;
  margin: 2%;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
`;

export default Favorite;

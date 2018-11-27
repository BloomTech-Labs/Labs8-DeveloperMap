import React from 'react';
import Heart from '../../images/favorites-icon.png';
import styled from 'styled-components';

function Favorite(props) {
   
    return (
        <FavoriteCard>
            <div>
            <h2>{props.favorite.companyName}</h2>
            <h3>{props.favorite.date}</h3>
            <h4>{props.favorite.jobLink}</h4>
            <h4>{props.favorite.jobTitle}</h4>
            <h4>{props.favorite.location}</h4>
            </div>
            <div>
            <img alt='hollow heart' src={Heart} style={{width:'50px'}}/>
            </div>
        </FavoriteCard>
)
}

const FavoriteCard = styled.div`
  border: 1px solid black;
  width: 300px;
  margin: 5%;
  padding: 3%;
  display: flex;
  justify-content: space-between;
`;

export default Favorite;
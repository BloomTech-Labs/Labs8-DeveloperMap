import React from 'react';
import firebase from '../../firebase/firebase';
import Favorite from './Favorite';
import styled from 'styled-components';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';
import axios from 'axios';

class SeekerFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    let uid = this.props.match.params.seekerId;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        uid = user.uid;
      }
    });
    axios
      .get(
        // `https://intense-stream-29923.herokuapp.com/api/database/favorites/${uid}`
        `http://localhost:9000/api/database/favorites/${uid}`
      )
      .then(response => {
        let favorites = [];
        console.log(response.data);
        response.data.forEach(job => console.log(job));
        this.setState({ favorites: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(!this.state.favorites);
    console.log(this.state.favorites);
    return (
      <ModalContainer data-type="modal-container">
        <ModalMain>
          <h1>Favorite Jobs</h1>
          <Fav>
            {this.state.favorites.length < 1 && (
              <h1>This user has not favorited any jobs</h1>
            )}
            {this.state.favorites.map((favorite, i) => (
              <Favorite key={i} {...this.props} favorite={favorite} />
            ))}
          </Fav>
        </ModalMain>
      </ModalContainer>
    );
  }
}

const Fav = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
  width: 100%;
`;

export default SeekerFavorites;

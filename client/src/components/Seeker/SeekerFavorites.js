import React from 'react';
import firebase from '../../firebase/firebase';
import Favorite from './Favorite';
import styled from 'styled-components';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';


class SeekerFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: ''
        }
    }

    componentDidMount() {
        const uid = this.props.match.params.seekerId;
        firebase
          .database()
          .ref()
          .child(`favoritePostings/${uid}`)
          .once('value')
          .then(snapshot => {
              this.setState({favorites: snapshot.val()});
          })
    }

    render() {
        return (
        <ModalContainer data-type= 'modal-container'>
            <ModalMain>
                <Fav>
                    {Object.values(this.state.favorites).map((favorite, i) => 
                    <Favorite key={i} {...this.props} favorite={favorite} />
                    )} 
                </Fav>
            </ModalMain>
        </ModalContainer>
        )
    }
}

const Fav = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
  width: 100%;
`;


export default SeekerFavorites;
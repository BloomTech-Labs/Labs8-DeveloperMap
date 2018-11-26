import React from 'react';
import firebase from '../../firebase/firebase';
import { ModalContainer, ModalMain } from '../../styles/ModalGlobalStyle';

import styled from 'styled-components';
import EmployerPostings from './EmployerPostings';

class EmployerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      companyWebsite: '',
      email: '',
      location: '',
      phoneNumber: '',
    };
  }

  componentDidMount() {
    const uid = this.props.match.params.companyId;
    firebase
      .database()
      .ref()
      .child(`companies/${uid}`)
      .once('value')
      .then(snapshot => {
        this.setState(snapshot.val());
      });
  }

  render() {
    return (
      <ModalContainer data-type="modal-container">
        <ModalMain>
          <Styling>
          <Info>
            <h2>{this.state.companyName}</h2>
            <h3>Location:</h3>
            <h4>{this.state.location}</h4>
            <h3>Website:</h3>
            <h4>{this.state.companyWebsite}</h4>
            <h3>Phone</h3>
            <h4>{this.state.phoneNumber}</h4>
            <h3>Email:</h3>
            <h4>{this.state.email}</h4>
          </Info>
          <EmployerPostings {...this.props}/>
          </Styling>
        </ModalMain>
      </ModalContainer>
    );
  }
  
}

const Info = styled.div`

  max-width: 400px;
  width: 100%;
`;


const Styling = styled.div`
  display: flex;
  padding: 5%;
  justify-content: space-between;
  max-width: 700px;
  width: 100%;
`;

export default EmployerProfile;

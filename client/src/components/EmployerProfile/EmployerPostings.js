import React from 'react';
import firebase from '../../firebase/firebase';

import styled from 'styled-components';

class EmployerPostings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: '',
        }
    }

    componentDidMount() {
        const uid = this.props.match.params.companyId;
        firebase
          .database()
          .ref()
          .child(`companyPostings/${uid}`)
          .once('value')
          .then(snapshot => {
            this.setState({ posts:snapshot.val()});
          });
    }
    render() {
        console.log(this.state.posts);
        return (
            <Posts>
                 {Object.values(this.state.posts).map((post, i) => 
                    <div key={i}>
                      <h2>{post.companyName}</h2>
                      <h3>{post.date}</h3>
                      <h4>{post.jobLink}</h4>
                      <h4>{post.jobTitle}</h4>
                      <h4>{post.location}</h4>
                    </div>
                    )} 
            </Posts>
        )
    }
}

const Posts = styled.div`
  border: 1px solid black;
`;


export default EmployerPostings;
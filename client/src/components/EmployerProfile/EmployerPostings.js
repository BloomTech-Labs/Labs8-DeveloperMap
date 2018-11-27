import React from 'react';
import firebase from '../../firebase/firebase';
import JobPosting from './JobPosting';

import {
    Posts
  } from './EmployerStyles';

class EmployerPostings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: '',
            favToggle: false
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

    favToggle = () => {
        console.log('working');
    }


    render() {
        console.log(this.state.posts);
        return (
            <Posts>
                 {Object.values(this.state.posts).map((post, i) => 
                    <JobPosting key={i} {...this.props} post={post} favToggle={this.favToggle}/>
                    )} 
            </Posts>
        )
    }
}


export default EmployerPostings;
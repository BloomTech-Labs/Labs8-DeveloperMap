import React from 'react';
import firebase from '../../firebase/firebase';
import JobPosting from './JobPosting';
import FavHeart from '../../images/favorites-icon.png';
import Heart from '../../images/hollow-heart.png';
import axios from 'axios';

import { Posts, PostContainer } from './EmployerStyles';

class EmployerPostings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      favToggle: false,
    };
  }

  componentDidMount() {
    const uid = this.props.match.params.employerId;
    firebase
      .database()
      .ref()
      .child(`companyPostings/${uid}`)
      .once('value')
      .then(snapshot => {
        this.setState({ posts: snapshot.val() });
      });
  }

  favToggle = (e, post) => {
    e.preventDefault();
    console.log(e.target.src, FavHeart);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { jobId } = post;
        const { uid } = user;
        if (e.target.src === FavHeart) {
          //Removes Favorited Post from current User if confirms
          if (window.confirm('Do want to unfavorite this post?')) {
            axios
              .delete(
                `https://intense-stream-29923.herokuapp.com/api/database/favorites/${uid}/${jobId}`
              )
              .then(response => {
                console.log(response.data);
                e.target.src = Heart;
              });
          }
        } else {
          //Adds Favorited Post to current User's list if confirms
          if (window.confirm('Do you want to favorite this post?')) {
            axios
              .post(
                `https://intense-stream-29923.herokuapp.com/api/database/favorites/${uid}/${jobId}`,
                post
              )
              .then(response => {
                console.log(response.data);
                e.target.src = FavHeart;
              });
          }
        }
      } else {
        window.location.replace('/signin');
      }
    });
  };

  render() {
    return (
      <PostContainer>
        {this.state.posts ? (
          <Posts>
            {Object.values(this.state.posts).map((post, i) => (
              <JobPosting
                key={i}
                index={i}
                {...this.props}
                post={post}
                heart={this.state.heart}
                favToggle={this.favToggle}
              />
            ))}
          </Posts>
        ) : (
          <Posts>
            <h1>This company has no job postings.</h1>
          </Posts>
        )}
      </PostContainer>
    );
  }
}

export default EmployerPostings;

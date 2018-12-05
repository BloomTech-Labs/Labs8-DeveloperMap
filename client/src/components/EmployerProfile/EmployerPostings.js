import React from 'react';
import firebase from '../../firebase/firebase';
import JobPosting from './JobPosting';
import FavHeart from '../../images/favorites-icon.png';
import Heart from '../../images/hollow-heart.png';
import axios from 'axios';

import { Posts, PostContainer } from './EmployerStyles';

const rootRef = firebase.database().ref();

class EmployerPostings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      favToggle: false,
      favoritedList: [],
    };
  }

  async componentDidMount() {
    const employerId = this.props.match.params.employerId;

    firebase.auth().onAuthStateChanged(({ uid }) => {
      if (uid) {
        if (this.state.posts) {
          axios
            .get(
              `https://intense-stream-29923.herokuapp.com/api/database/favorites/keys/${uid}`
            )
            .then(({ data }) => {
              this.setState({
                favoritedList: data,
                initialFavoritedList: data,
              });
            });
        } else {
          axios
            .get(
              `https://intense-stream-29923.herokuapp.com/api/database/companies/jobPostings/${employerId}/${uid}`
            )
            .then(({ data }) => {
              this.setState({
                posts: data.posts,
                favoritedList: data.favoritedList,
                initialFavoritedList: data.favoritedList,
              });
            });
        }
      } else {
        axios
          .get(
            `https://intense-stream-29923.herokuapp.com/api/database/companies/jobPostings/${employerId}/noUser`
          )
          .then(({ data }) => {
            this.setState({
              posts: data.posts,
              favoritedList: data.favoritedList,
              initialFavoritedList: data.favoritedList,
            });
          });
      }
    });
  }

  favToggle = async (e, post) => {
    e.preventDefault();
    console.log(e.target.src, FavHeart);

    const user = this.props.user;
    console.log(user);
    if (!user) {
      window.location.replace('/signin');
    }
    const { uid } = user;
    const { jobId } = post;

    if (e.target.src === FavHeart) {
      //Removes Favorited Post from current User if confirms
      if (window.confirm('Do want to unfavorite this post?')) {
        e.target.src = Heart;
        e.target.classList.toggle('favorited');
        axios
          .delete(
            `https://intense-stream-29923.herokuapp.com/api/database/favorites/${uid}/${jobId}`
          )
          .catch();
      }
    } else {
      //Adds Favorited Post to current User's list if confirms
      if (window.confirm('Do you want to favorite this post?')) {
        e.target.src = FavHeart;
        e.target.classList.toggle('favorited');
        axios
          .post(
            `https://intense-stream-29923.herokuapp.com/api/database/favorites/${uid}/${jobId}`,
            post
          )
          .catch();
      }
    }
  };

  componentWillUnmount() {
    //console.log(document.querySelectorAll(`[src: "${FavHeart}"]`));
  }
  render() {
    return (
      <PostContainer>
        {this.state.posts ? (
          <Posts>
            {Object.values(this.state.posts).map((post, i) => (
              <JobPosting
                key={i}
                index={i}
                favoritedList={this.state.favoritedList}
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

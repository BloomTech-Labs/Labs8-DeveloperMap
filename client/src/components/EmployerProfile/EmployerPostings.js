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
      posts: [],
      favToggle: false,
      favoritedList: [],
    };
  }

  async componentDidMount() {
    const user = this.props.user;
    let favoritedList = [];
    const employerId = this.props.match.params.employerId;

    rootRef
      .child(`companyPostings/${employerId}`)
      .once('value')
      .then(posts => {
        this.setState({ posts: posts.val() });
      })
      .then(() => {
        if (user) {
          const uid = user.uid;
          rootRef
            .child(`favoritePostings/${uid}`)
            .once('value')
            .then(favoritePostings => {
              favoritePostings.forEach(childSnap => {
                favoritedList.push(childSnap.key);
              });
              this.setState({ favoritedList });
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
        axios
          .post(
            `https://intense-stream-29923.herokuapp.com/api/database/favorites/${uid}/${jobId}`,
            post
          )
          .catch();
      }
    }
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

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

  favToggle = async (e, post) => {
    e.preventDefault();

    const user = this.props.user;
    if (!user) {
      this.props.history.push('/signin');
    } else if (e.target.src === FavHeart) {
      //Removes Favorited Post from current User if confirms
      const favoritedList = [
        ...this.state.favoritedList.filter(jobId => jobId !== e.target.id),
      ];
      this.setState({ favoritedList });
      e.target.src = Heart;
    } else {
      //Adds Favorited Post to current User's list if confirms
      const favoritedList = [...this.state.favoritedList];
      favoritedList.push(e.target.id);
      this.setState({ favoritedList });
      e.target.src = FavHeart;
    }
  };

  componentWillUnmount() {
    const { favoritedList, initialFavoritedList } = this.state;
    firebase.auth().onAuthStateChanged(user => {
      if (favoritedList !== initialFavoritedList) {
        if (user) {
          const { uid } = user;
          axios
            .put(
              'https://intense-stream-29923.herokuapp.com/api/database/favorites',
              {
                favoritedList,
                uid,
              }
            )
            .then();
        }
      } else {
        console.log('no change');
      }
    });
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

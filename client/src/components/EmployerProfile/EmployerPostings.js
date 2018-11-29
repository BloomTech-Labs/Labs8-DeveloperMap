import React from 'react';
import firebase from '../../firebase/firebase';
import JobPosting from './JobPosting';
import FavHeart from '../../images/favorites-icon.png';
import Heart from '../../images/hollow-heart.png';

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

  favToggle = (e, jobId) => {
    e.preventDefault();
    console.log(e.target.src, FavHeart);
    if (e.target.src === FavHeart) {
      if (window.confirm('Do want to unfavorite this post?')) {
        console.log(jobId);
        e.target.src = Heart;
      }
    } else {
      if (window.confirm('Do you want to favorite this post?')) {
        console.log(jobId);
        e.target.src = FavHeart;
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

import React from 'react';
import styled from 'styled-components';
import Heart from '../../images/hollow-heart.png';
import FavHeart from '../../images/favorites-icon.png';

class JobPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // Axios.get().then(response => {
    //   const favoritedList = response.data;
    //   if (favoritedList.includes(this.props.post.jobId)) {
    //     document.querySelector(`#${jobId}`).setAttribute('src', FavHeart);
    //   }
    // });
    const favoritedList = this.props.favoritedList;
    console.log(favoritedList);
    console.log(favoritedList.includes(this.props.post.jobId));
    if (favoritedList.includes(this.props.post.jobId)) {
      document
        .querySelector(`#${this.props.post.jobId}`)
        .setAttribute('src', FavHeart);
    }
  }

  passPostThenToggle = e => {
    this.props.favToggle(e, this.props.post);
  };
  render() {
    const favoritedList = this.props.favoritedList;
    if (favoritedList.includes(this.props.post.jobId)) {
      const favoritedCards = document.querySelector(
        `#${this.props.post.jobId}`
      );
      if (favoritedCards) {
        favoritedCards.setAttribute('src', FavHeart);
      }
    }
    const { jobLink } = this.props.post;
    return (
      <Job>
        <div>
          <h2>{this.props.post.companyName}</h2>
          <h3>{this.props.post.date}</h3>
          <h4>
            <a href={jobLink.includes('http') ? jobLink : `https://${jobLink}`}>
              {this.props.post.jobLink}
            </a>
          </h4>
          <h4>{this.props.post.jobTitle}</h4>
          <h4>{`${this.props.post.location.city}, ${
            this.props.post.location.state
          } ${this.props.post.location.zip}`}</h4>
        </div>
        <div>
          <img
            id={this.props.post.jobId}
            alt="hollow heart"
            src={Heart}
            style={{ width: '50px' }}
            onClick={this.passPostThenToggle}
          />
        </div>
      </Job>
    );
  }
}

const Job = styled.div`
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: space-between;
  height: 130px;
  max-width: 350px;
  width: 100%;
  border: 0.7px solid rgba(220, 220, 220, 0.6);
  padding: 5%;
  margin-bottom: 15px;
  &:hover {
    box-shadow: none;
  }
`;

export default JobPosting;
